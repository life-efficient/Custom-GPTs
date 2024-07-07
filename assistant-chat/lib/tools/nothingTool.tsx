import { z } from 'zod'
import { ToolCallCompleteMessage, ToolCallLoadingStateMessage } from '@/lib/tools'
import { sleep } from '@/lib/utils'
import { nanoid } from 'nanoid'
import { getMutableAIState } from 'ai/rsc'


const getNothingTool = () => {
    const aiState = getMutableAIState<typeof AI>()
    return {
        description: 'Demonstrates tool calling, but does nothing',
        parameters: z.object({
            demoParam: z.array(
            z.object({
                demoParamObject1: z.string().describe('The first demo parameter'),
                demoParamObject2: z.number().describe('The second demo parameter'),
                demoParamObject3: z.number().describe('The third demo parameter')
            })
            )
        }),
        generate: async function* ({ demoParam }) {
            yield (
                <ToolCallLoadingStateMessage text='Talking to nothingTool...' />
            )

            await sleep(3000)

            const toolCallId = nanoid()

            // IMPLEMENT TOOL CALL HERE

            aiState.done({
            ...aiState.get(),
            messages: [
                ...aiState.get().messages,
                {
                id: nanoid(),
                role: 'assistant',
                content: [
                    {
                    type: 'tool-call',
                    toolName: 'nothingTool',
                    toolCallId,
                    args: { demoParam }
                    }
                ]
                },
                {
                id: nanoid(),
                role: 'tool',
                content: [
                    {
                    type: 'tool-result',
                    toolName: 'nothingTool',
                    toolCallId,
                    result: 'demo result'
                    }
                ]
                }
            ]
            })

            return (
            <ToolCallCompleteMessage text='Talked to nothingTool' />
            )
        }
    }
}

export default getNothingTool