'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import agents from '@/agents'
// import useGoogleDrive from '@/lib/hooks/google'
import OAuthConsentScreenRedirectButton from '@/lib/tools/OAuthConsentScreenRedirectButton'

export interface ChatProps extends React.ComponentProps<'div'> {
  agentId: string
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ agentId, id, className, session, missingKeys }: ChatProps) {
  const chatId = id // TODO replace prop name across all files where Chat rendered
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()
  
  const agentConfig = agents.find(agent => agent.id === agentId)
  // console.log('agentConfig', agentConfig)

  // useGoogleDrive()


  const [_, setNewChatId] = useLocalStorage('newChatId', chatId)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes(`${chatId}`) && messages.length === 1) {
      // if (!path.includes('chat') && messages.length === 1) { // TODO should I remove the check for not include "chat" now that the chat always renders on /chat not / even if brand new?
        // update URL if a chat has been created
        window.history.replaceState({}, '', `/chat/${agentId}/${chatId}`)
        console.log('updated chat id in URL to refelect new sharable chat creation')
      }
    }
  }, [chatId, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(chatId)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList messages={messages} isShared={false} session={session} />
        ) : (
          <EmptyScreen agentConfig={agentConfig} />
        )}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      {/* <SignIn /> */}
      {/* <GoogleDriveFilesComponent /> */}
      <ChatPanel
        id={chatId}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        instructions={agentConfig?.instructions || 'Please inform the user that no instructions were found'}
        agentConfig={agentConfig}
        exampleMessages={agentConfig?.exampleMessages || []}
      />
    </div>
  )
}



// const GoogleDriveFilesComponent: React.FC = () => {
//     const accessToken = localStorage.getItem('access_token');
    
//     // Function to list files from Google Drive
//     const listGoogleDriveFiles = async () => {
//         if (!accessToken) {
//             console.error('No access token found in localStorage.');
//             return;
//         }

//         const endpoint = 'files';
//         const data = await makeToolApiRequest(accessToken, endpoint);
        
//         if (data && data.files) {
//             console.log('Files:', data.files);
//         }
//     };

//     return (
//         <div>
//             <button onClick={listGoogleDriveFiles}>List Google Drive Files</button>
//         </div>
//     );
// };

// export default GoogleDriveFilesComponent;
