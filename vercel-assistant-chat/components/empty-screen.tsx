import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export interface EmptyScreenProps {
  agentConfig: {
    agentId: string
    name: string
    description: string
    instructions: string
    exampleMessages: {
      heading: string
      subheading: string
      message: string
    }[]
  }
}

export function EmptyScreen({ agentConfig }: EmptyScreenProps) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          {agentConfig.name}
        </h1>
        <p className="leading-normal text-muted-foreground">
          {agentConfig.description}
        </p>
      </div>
    </div>
  )
}
