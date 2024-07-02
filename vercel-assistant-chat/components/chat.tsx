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

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const chatId = id // TODO replace prop name across all files where Chat rendered
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()
  
  const urlParameters = useSearchParams() // TODO check working
  const [agentId, setAgentId] = useState(urlParameters.get('agent_id') || 'default')
  const agentConfig = agents.find(agent => agent.id === agentId)
  console.log('agentConfig', agentConfig)


  const [_, setNewChatId] = useLocalStorage('newChatId', chatId)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes(`${chatId}`) && messages.length === 1) {
      // if (!path.includes('chat') && messages.length === 1) { // TODO should I remove the check for not include "chat" now that the chat always renders on /chat not / even if brand new?
        // update URL if a chat has been created
        window.history.replaceState({}, '', `/chat/${chatId}`)
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
      <ChatPanel
        id={chatId}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        exampleMessages={agentConfig?.exampleMessages || []}
      />
    </div>
  )
}
