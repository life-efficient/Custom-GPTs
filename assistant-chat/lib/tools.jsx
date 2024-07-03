import { z } from 'zod'
import { nanoid } from 'nanoid'
import { BotCard } from '@/components/stocks'
import { get } from 'http'

const getToolsFromToolName = (toolName) => {
    // TODO
    // import tool from agents/actions/toolName
    console.log('importing tool', toolName)
    const tool = require(`@/agents/actions/${toolName}/action.js`)
    console.log('imported tool', tool)
    // tool.

    // get list of different endpoints available with tool
}

export default function getTool(toolName='exampleTool'){

    console.log('getting tool', toolName)
    getToolsFromToolName(toolName)
    console.log('got tool', toolName)
    switch (toolName) {
        default:
            return {
                description: 'Example tool',
                parameters: z.object({
                    example: z.string().describe('Example parameter')
                }),
                generate: async function* ({ example }) {
                    yield (
                        // returned immediately to show intermediate loading state
                        <BotCard>
                            <p>Example tool yooo</p>
                        </BotCard>
                    )

                    // await sleep(1000)

                    const toolCallId = nanoid()

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
                                        toolName: 'exampleTool',
                                        toolCallId,
                                        args: { example }
                                    }
                                ]
                            },
                            {
                                id: nanoid(),
                                role: 'tool',
                                content: [
                                    {
                                        type: 'tool-result',
                                        toolName: 'exampleTool',
                                        toolCallId,
                                        result: example
                                    }
                                ]
                            }
                        ]
                    })

                    // returned after the tool has finished processing
                    return (
                        <BotCard>
                            <p>Example tool yoooo</p>
                        </BotCard>
                    )
                }
            }
    }
}





// TOOL TEMPLATE TO COPY
// {
//         description: 'Example tool',
//         parameters: z.object({
//           example: z.string().describe('Example parameter')
//         }),
//         generate: async function* ({ example }) {
//           yield (
//             <BotCard>
//               <p>Example tool</p>
//             </BotCard>
//           )

//           await sleep(1000)

//           const toolCallId = nanoid()

//           aiState.done({
//             ...aiState.get(),
//             messages: [
//               ...aiState.get().messages,
//               {
//                 id: nanoid(),
//                 role: 'assistant',
//                 content: [
//                   {
//                     type: 'tool-call',
//                     toolName: 'exampleTool',
//                     toolCallId,
//                     args: { example }
//                   }
//                 ]
//               },
//               {
//                 id: nanoid(),
//                 role: 'tool',
//                 content: [
//                   {
//                     type: 'tool-result',
//                     toolName: 'exampleTool',
//                     toolCallId,
//                     result: example
//                   }
//                 ]
//               }
//             ]
//           })

//           return (
//             <BotCard>
//               <p>Example tool</p>
//             </BotCard>
//           )
//         }