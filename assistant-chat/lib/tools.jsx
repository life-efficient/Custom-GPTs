import { z } from 'zod'
import { nanoid } from 'nanoid'
import { BotCard } from '@/components/stocks'

// EXAMPLE SPEC for copilot to use for writing the getTool function
    // "openapi": "3.1.0",
    // "info": {
    //     "title": "Google Sheets API Operations",
    //     "description": "An OpenAPI specification for creating, updating, reading, and appending a range of cells in a Google Sheet.",
    //     "version": "1.0"
    // },
    // "servers": [
    //     {
    //         "url": "https://sheets.googleapis.com/v4/spreadsheets"
    //     }
    // ],
    // "paths": {
    //     "/": {
    //         "post": {
    //             "summary": "Create a new spreadsheet",
    //             "operationId": "createSpreadsheet",
    //             "requestBody": {
    //                 "required": true,
    //                 "content": {
    //                     "application/json": {
    //                         "schema": {
    //                             "$ref": "#/components/schemas/Spreadsheet"
    //                         }
    //                     }
    //                 }
    //             },
    //             "responses": {
    //                 "200": {
    //                     "description": "Spreadsheet created successfully",
    //                     "content": {
    //                         "application/json": {
    //                             "schema": {
    //                                 "$ref": "#/components/schemas/Spreadsheet"
    //                             }
    //                         }
    //                     }
    //                 },
    //                 "400": {
    //                     "description": "Bad Request"
    //                 }
    //             }
    //         }
    //     },
    // "/{spreadsheetId}": {
    //   "get": {
    //     "summary": "Read the entire spreadsheet",
    //     "operationId": "getSpreadsheetValuesEntire",
    //     "parameters": [
    //       {
    //         "name": "spreadsheetId",
    //         "in": "path",
    //         "required": true,
    //         "schema": {
    //           "type": "string"
    //         },
    //         "description": "The ID of the spreadsheet to retrieve data from."
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "Success",
    //         "content": {
    //           "application/json": {
    //             "schema": {
    //               "$ref": "#/components/schemas/ValueRange"
    //             }
    //           }
    //         }
    //       },
    //       "400": {
    //         "description": "Bad Request"
    //       }
    //     }
    //   }
    // },
//      "components": {
//     "schemas": {
//       "Spreadsheet": {
//         "type": "object",
//         "properties": {
//           "properties": {
//             "type": "object",
//             "properties": {
//               "title": {
//                 "type": "string"
//               },
//               "locale": {
//                 "type": "string"
//               },
//               "autoRecalc": {
//                 "type": "string"
//               },
//               "timeZone": {
//                 "type": "string"
//               }
//             }
//           },
//           "sheets": {
//             "type": "array",
//             "items": {
//               "type": "object",
//               "properties": {
//                 "properties": {
//                   "type": "object",
//                   "properties": {
//                     "title": {
//                       "type": "string"
//                     },
//                     "index": {
//                       "type": "integer"
//                     },
//                     "sheetType": {
//                       "type": "string"
//                     },
//                     "gridProperties": {
//                       "type": "object",
//                       "properties": {
//                         "rowCount": {
//                           "type": "integer"
//                         },
//                         "columnCount": {
//                           "type": "integer"
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       },
//       "ValueRange": {
//         "type": "object",
//         "properties": {
//           "values": {
//             "type": "array",
//             "items": {
//               "type": "array",
//               "items": {
//                 "type": "string"
//               }
//             },
//             "description": "The new data to be placed in the range."
//           }
//         }
//       },
//       "UpdateValuesResponse": {
//         "type": "object",
//         "properties": {
//           "spreadsheetId": {
//             "type": "string"
//           },
//           "updatedRange": {
//             "type": "string"
//           },
//           "updatedRows": {
//             "type": "integer"
//           },
//           "updatedColumns": {
//             "type": "integer"
//           },
//           "updatedCells": {
//             "type": "integer"
//           }
//         }
//       },
//       "AppendValuesResponse": {
//         "type": "object",
//         "properties": {
//           "spreadsheetId": {
//             "type": "string"
//           },
//           "tableRange": {
//             "type": "string"
//           },
//           "updates": {
//             "type": "object",
//             "properties": {
//               "updatedRange": {
//                 "type": "string"
//               },
//               "updatedRows": {
//                 "type": "integer"
//               },
//               "updatedColumns": {
//                 "type": "integer"
//               },
//               "updatedCells": {
//                 "type": "integer"
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

export default function getTool(toolName='exampleTool'){



    console.log('importing tool', toolName)
    const tool = require(`@/agents/actions/${toolName}/action.js`).default
    console.log('imported tool', tool)
    
    const tools = []
    
    // const apiHost = tool.servers[0].url
    // get list of different paths available at this API
    for (const path in tool.paths) {
    // tool.paths.map(path => {

        // TODO replace map with forEach to parallelise
        // TODO implement promises to parallelise

        console.log('path', path)

        // const endpoint = apiHost + path

        // get list of different methods available at this endpoint
        for (const method in tool.paths[path]) {
        // path.map(method => {
            console.log('\tmethod', method)
            // get the parameters for this method
            const methodSchema = tool.paths[path][method]
            const description = methodSchema.summary
            // get the parameters for this method

            // the parameters may or may not be based on the schema in the components object of the API spec
            // TODO? possibly ensure that the api spec is generated without using references
            // references are used to deduplicate the schema, but this may not be necessary for our purposes, as the schema can be generated by an AI system
            // if schema uses references
            if (methodSchema.requestBody) {
                console.log(path, method, 'has requestBody')
                continue
                // update the method to use "parameters" instead of "requestBody"
                const schema = methodSchema.requestBody.content['application/json'].schema['$ref']
                // TODO

                
            }
            let parameters = methodSchema.parameters
            // turn the params into this format using zod:
            // parameters: z.object({
            //         example: z.string().describe('Example parameter')
            //     }), 
            parameters = parameters.reduce((acc, param) => {
                switch (param.schema.type) {
                    case 'string':
                    default:
                        return acc[param.name] = z.string().describe(param.description)
                        console.log('unsupported type', param.schema.type)
                        // continue
                // TODO implement other case for non-strings
                // e.g
                    //       stocks: z.array(
                    //         z.object({
                    //           symbol: z.string().describe('The symbol of the stock'),
                    //           price: z.number().describe('The price of the stock'),
                    //           delta: z.number().describe('The change in price of the stock')
                    //         })
                    //       )
                }
            }, {})

            const toolDefinition = {
                description,
                parameters,
                generate: () => {
                    //  const aiState = getMutableAIState<typeof AI>()
                    // TODO update aiState as below
                    // TODO implement backend tool call if necessary as described below
                    return "Hello world"
                }
            }

            tools.push(toolDefinition)
        }   
    }

    console.log('returning tools', tools)

        // TODO current goal: get the model to generate the correct tool params dynamically, straight from the openAPI spec

    return tools

        // console.log('getting tool', toolName)
        // console.log('got tool', toolName)
        // switch (toolName) {
        //     default:
        //         return {
        //             description: 'Example tool',
        //             parameters: z.object({
        //                 example: z.string().describe('Example parameter')
        //             }),
        //             generate: async function* ({ example }) {
        //                 // the param passed in here is what is generated by the model based on the context, tool description, and tool parameters
        //                 yield (
        //                     // returned immediately to show intermediate loading state
        //                     <BotCard>
        //                         <p>Example tool yooo</p>
        //                     </BotCard>
        //                 )

        //                 // await sleep(1000) // simulation of using the tool (possibly an API call to a backend service)

        //                 const toolCallId = nanoid()

        //                 // TODO implement call to endpoint via backend (perhaps this file needs to be qualified as "server-only"?)
        //                 // NO THIS IS WRONG ^, the model response is passed in as a parameter to the tool
        //                 // at least I think so
        //                 // TODO log to find out
        //                 // wait no that's wrong, the model response is passed in as a parameter to the generate function, but the function still needs to be called
        //                 // e.g. imagine the model wants to get the current weather from an API
        //                 // 1. the params for the model to make the request would be passed in
        //                 // 2. the model would yield the loading state defined above
        //                 // 3. the request to the endpoint would need to go here
        //                 // 4. the result of the request is used to update the AI state below
        //                 // 5. this method returns the relevant UI component to render the result of the tool
                        
        //                 // in the case where the model output can be directly rendered, this API call would not be necessary
        //                 // this should also all be compatible with the useAssistant hook when we migrate

        //                 aiState.done({
        //                     ...aiState.get(),
        //                     messages: [
        //                         ...aiState.get().messages,
        //                         {
        //                             id: nanoid(),
        //                             role: 'assistant',
        //                             content: [
        //                                 {
        //                                     type: 'tool-call',
        //                                     toolName: 'exampleTool',
        //                                     toolCallId,
        //                                     args: { example }
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             id: nanoid(),
        //                             role: 'tool',
        //                             content: [
        //                                 {
        //                                     type: 'tool-result',
        //                                     toolName: 'exampleTool',
        //                                     toolCallId,
        //                                     result: example
        //                                 }
        //                             ]
        //                         }
        //                         // TODO how do we get the AI to provide a response commentating on the tool result?
        //                     ]
        //                 })

        //                 // returned after the tool has finished processing
        //                 return (
        //                     <BotCard>
        //                         <p>Example tool yoooo</p>
        //                     </BotCard>
        //                 )
        //             }
        //         }
        // }
}





// IDEAL OUTPUT TOOL TEMPLATE for copilot TO COPY
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