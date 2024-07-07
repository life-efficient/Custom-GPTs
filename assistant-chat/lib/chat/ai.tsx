import getNothingTool from '@/lib/tools/nothingTool'
import {
  getMutableAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai';
import { SpinnerMessage, BotMessage } from '@/components/stocks/message'
import { nanoid } from 'nanoid'
import { AgentConfig } from '@/lib/types';

const getResponse = (
    aiState, 
    agentConfig: AgentConfig, 
    tools={}
) => {
    // TODO switch to using useAssistant to take advantage of the new hooks from vercel AI SDK

    let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
    let textNode: undefined | React.ReactNode

    return streamUI({
        model: openai('gpt-3.5-turbo'),
        initial: <SpinnerMessage />,
        system: agentConfig.instructions,
        messages: [
            ...aiState.get().messages.map((message: any) => ({
                role: message.role,
                content: message.content,
                name: message.name
            }))
        ],
        text: ({ content, done, delta }) => {
            if (!textStream) {
                textStream = createStreamableValue('')
                textNode = <BotMessage content={textStream.value} />
            }

            if (done) {
                textStream.done()
                aiState.done({
                    ...aiState.get(),
                    messages: [
                        ...aiState.get().messages,
                        {
                        id: nanoid(),
                        role: 'assistant',
                        content
                        }
                    ]
                })
            } else {
                textStream.update(delta)
            }

            return textNode
        },
        tools: {
            ...tools,
            // nothingTool: getNothingTool()
        }
    })
}

export { getResponse }