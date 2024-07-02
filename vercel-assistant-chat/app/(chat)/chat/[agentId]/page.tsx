import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'

export interface IndexPageProps {
  params: {
    agentId: string
  }
}

export const metadata = {
  title: 'AI Chatbot'
}

export default async function IndexPage({ params }: IndexPageProps) {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat agentId={params.agentId} id={id} session={session} missingKeys={missingKeys} />
    </AI>
  )
}
