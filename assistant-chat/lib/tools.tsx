import { z } from 'zod'
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { nanoid } from 'nanoid'
import { IconOpenAI } from '@/components/ui/icons'
import { getMutableAIState } from 'ai/rsc'
import { getResponse } from './chat/ai';
import { AgentConfig } from '@/lib/types';

import OAuthConsentScreenRedirectButton from './tools/OAuthConsentScreenRedirectButton';
import { set } from 'date-fns';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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
    //     "/{spreadsheetId}": {
    //         "get": {
    //             "summary": "Read the entire spreadsheet",
    //             "operationId": "getSpreadsheetValuesEntire",
    //             "parameters": [
        //             {
        //                 "name": "spreadsheetId",
        //                 "in": "path",
        //                 "required": true,
        //                 "schema": {
        //                      "type": "string"
        //                 },
        //                 "description": "The ID of the spreadsheet to retrieve data from."
        //             }
    //             ],
    //             "responses": {
    //             "200": {
    //                 "description": "Success",
    //                 "content": {
    //                 "application/json": {
    //                     "schema": {
    //                     "$ref": "#/components/schemas/ValueRange"
    //                     }
    //                 }
    //                 }
    //             },
    //             "400": {
    //                 "description": "Bad Request"
    //             }
    //             }
    //         }
    //     },
    // }
// "components": {
//     "schemas": {
//         "Spreadsheet": {
//             "type": "object",
//             "properties": {
//                 "properties": {
//                     "type": "object",
//                     "properties": {
//                         "title": {
//                             "type": "string"
//                         },
//                         "locale": {
//                             "type": "string"
//                         },
//                         "autoRecalc": {
//                             "type": "string"
//                         },
//                         "timeZone": {
//                             "type": "string"
//                         }
//                     }
//                 },
//                 "sheets": {
//                     "type": "array",
//                     "items": {
    //                     "type": "object",
    //                     "properties": {
    //                         "properties": {
        //                         "type": "object",
        //                         "properties": {
        //                             "title": {
        //                                 "type": "string"
        //                             },
        //                             "index": {
        //                                  "type": "integer"
        //                             },
        //                             "sheetType": {
        //                                  "type": "string"
        //                             },
        //                             "gridProperties": {
            //                              "type": "object",
            //                             "properties": {
            //                                 "rowCount": {
            //                                     "type": "integer"
            //                                 },
            //                                 "columnCount": {
            //                                     "type": "integer"
            //                                 }
            //                             }
        //                             }
        //                         }
    //                         }
    //                     }
//                     }
//                 }
//             }
//         },
//         "ValueRange": {
//             "type": "object",
//             "properties": {
    //             "values": {
    //                 "type": "array",
    //                 "items": {
        //                 "type": "array",
        //                 "items": {
        //                     "type": "string"
        //                     "description": "insert description."
        //                 }
    //                 },
    //                 "description": "The new data to be placed in the range."
    //             }
//             }
//         },
//         "UpdateValuesResponse": {
//             "type": "object",
//             "properties": {
    //             "spreadsheetId": {
    //                 "type": "string"
    //             },
    //             "updatedRange": {
    //                 "type": "string"
    //             },
    //             "updatedRows": {
    //                 "type": "integer"
    //             },
    //             "updatedColumns": {
    //                 "type": "integer"
    //             },
    //             "updatedCells": {
    //                 "type": "integer"
    //             }
//             }
//         },
//         "AppendValuesResponse": {
//             "type": "object",
//             "properties": {
//                 "spreadsheetId": {
//                     "type": "string"
//                 },
//                 "tableRange": {
//                     "type": "string"
//                 },
//                 "updates": {
//                     "type": "object",
//                     "properties": {
//                         "updatedRange": {
//                             "type": "string"
//                         },
//                         "updatedRows": {
//                             "type": "integer"
//                         },
//                         "updatedColumns": {
//                             "type": "integer"
//                         },
//                         "updatedCells": {
//                             "type": "integer"
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

export default function getTool(toolName, accessTokens, agentConfig: AgentConfig){

    const aiState = getMutableAIState()

    console.log('importing tool', toolName)
    const tool = require(`@/agents/actions/${toolName}/action.js`).default
    console.log('imported tool', tool)
    
    const tools = {}
    
    const apiHost = tool.servers[0].url

    for (const path in tool.paths) {

        // TODO replace map with forEach to parallelise
        // TODO implement promises to parallelise

        console.log('path', path)

        const endpoint = apiHost + path

        for (const method in tool.paths[path]) {
            console.log('\tmethod', method)
            // get the parameters for this method
            const methodSchema = tool.paths[path][method]
            const description = methodSchema.summary

            /**
             * This function turns the params into required format for the AI to interpret.
             * 
             * For example:
             * 
             * parameters: z.object({ 
             * example: z.string().describe('Example parameter') 
             * }),
             * 
             * @param {object} param 
             * @returns {*}
             */
            const convertSchemaToParams = (param) => {
                console.log('converting schema to params', param)
                if (!param.type) { // if there is no type, it means thereis more than one parameter in params.
                    const objectWithMultipleParams = {}
                    for (const key in param) {
                        objectWithMultipleParams[key] = convertSchemaToParams(param[key])
                    }
                    return objectWithMultipleParams
                }

                switch (param.type) {
                    case 'string':
                        return z.string().describe(param.description)
                    case 'integer':
                        return z.number().describe(param.description)
                    case 'boolean':
                        return z.boolean().describe(param.description)
                    case 'array':
                        return z.array(convertSchemaToParams(param.items))
                    case 'object':
                        return z.object(convertSchemaToParams(param.properties))
                    default:
                        console.log("unsupported type", param.type)
                        return z.string().describe('unknown description')
                }
            }

            // EXAMPLE OUTPUTS (to see what parameters originally looks like see EXAMPLE SPEC)
            
            // ValueRange: z.object({ // this oen had type object.
            //     values: z.array(
            //         z.array(
            //             z.string().describe(values.items.items.decription)
            //         )
            //     ).describe(values.description)
            // })

            // Spreadsheet: z.object({
            //     properties: z.object({
            //         title: z.string().describe('The title of the spreadsheet'),
            //         locale: z.string().describe('The locale of the spreadsheet'),
            //         autoRecalc: z.string().describe('The autoRecalc of the spreadsheet'),
            //         timeZone: z.string().describe('The timeZone of the spreadsheet')
            //     }),
            //     sheets: z.array(
            //         z.object({
            //             properties: z.object({
            //                 title: z.string().describe('The title of the sheet'),
            //                 index: z.number().describe('The index of the sheet'),
            //                 sheetType: z.string().describe('The type of the sheet'),
            //                 gridProperties: z.object({
            //                     rowCount: z.number().describe('The number of rows in the grid'),
            //                     columnCount: z.number().describe('The number of columns in the grid')
            //                 })
            //             })
            //         })
            //     )
            // })

            // SIMPLE EXAMPLE
            // getSpreadsheetValuesrange: z.object({ 
            //     spreadsheetId: z.string().describe('The ID of the spreadsheet to retrieve data from.'),
            //     range: z.string().describe('The range of cells to retrieve data from'),
            // })

            let parameters //TODO: add some typecript types here

            if (methodSchema.requestBody) {
                const schemaRef = methodSchema.requestBody.content['application/json'].schema['$ref']

                let schema = schemaRef.split('/').pop()
                console.log('schema:', schema) 
                parameters = tool.components.schemas[schema]

                parameters = convertSchemaToParams(parameters)

            } else {
                parameters = methodSchema.parameters

                parameters = z.object(parameters.reduce((acc, param) => { 
                    switch (param.schema.type) {
                        case 'string':
                            return acc[param.name] = z.string().describe(param.description)
                        default: // this may work for other types, but it is untested. 
                            console.log('unsupported type', param.schema.type)
                            return acc[param.name] = convertSchemaToParams(param.schema)
                    }
                }, {}))
            }


            const toolDefinition = {
                description: methodSchema.summary, // TODO: check if this is right
                parameters,
                generate: async function* (payloadGeneratedByModel) {

                    let continueTool = true
                    
                    console.log("Access tokens", accessTokens)
                    // TODO: Check some sort of state variable which continues where you left off. 

                    // Check if access token exists.
                    // if it doesn't exist make component to ask for it
                    // if it does exist then continue as normal.

                    if (!accessTokens) {
                        return <OAuthConsentScreenRedirectButton
                            message='Please sign in to continue.'
                            authUrl='https://accounts.google.com/o/oauth2/v2/auth'
                            clientId='562576427978-irfv775j08db68mo1qj98o9m0fkhdi30.apps.googleusercontent.com'
                            scopes='https://www.googleapis.com/auth/drive'
                        />

                    }
                    const accessToken = accessTokens
                    const response = await makeToolApiRequest(accessToken, endpoint, payloadGeneratedByModel, method)
                    console.log('response', response)

                    if (response === 'Failed to make API request: Error: Unauthorized: Invalid or expired token.') {
                        console.log('Access token expired')
                        return <OAuthConsentScreenRedirectButton
                                message='Access token expired. Please sign in to continue.'
                                authUrl='https://accounts.google.com/o/oauth2/v2/auth'
                                clientId='562576427978-irfv775j08db68mo1qj98o9m0fkhdi30.apps.googleusercontent.com'
                                scopes='https://www.googleapis.com/auth/drive'
                                />

                    }

                    yield (
                        <ToolCallLoadingStateMessage text={`Talking to ${endpoint} to call ${methodSchema.operationId}`} />
                    )

                    // TODO update /access to store different accesstokens within this object, instead of just a string for the latest accesstoken
                    // TODO check for access token in localstorage
                    // TODO refresh access token if expired

                    // TODO move params into respective endpoint query string params or payload

                    //  const aiState = getMutableAIState<typeof AI>()
                    // TODO update aiState as below
                    
                    yield <ToolCallCompleteMessage text={`Talked to ${endpoint} to call ${methodSchema.operationId}`} />

                    await sleep(1000)
                    
                    const toolCallId = nanoid()

                    // TODO fix this abstraction. The aiState doesn't update
                    // const addAssistantMessageToAiState = (aiState, message) => {
                    //     aiState.done({
                    //         ...aiState.get(),
                    //         messages: [
                    //             ...aiState.get().messages,
                    //             {
                    //                 id: nanoid(),
                    //                 role: 'assistant',
                    //                 content: message
                    //             }
                    //         ]
                    //     })
                    // }

                    // const addToolCallMessageToAiState = (aiState, toolName, toolCallId, args, result) => {
                    //     aiState.done({
                    //         ...aiState.get(),
                    //         messages: [
                    //             ...aiState.get().messages,
                    //             {
                    //                 id: nanoid(),
                    //                 role: 'tool',
                    //                 content: [
                    //                     {
                    //                         type: 'tool-call',
                    //                         toolName,
                    //                         toolCallId,
                    //                         args
                    //                     }
                    //                 ]
                    //             },
                    //             {
                    //                 id: nanoid(),
                    //                 role: 'tool',
                    //                 content: [
                    //                     {
                    //                         type: 'tool-result',
                    //                         toolName,
                    //                         toolCallId,
                    //                         result
                    //                     }
                    //                 ]
                    //             }
                    //         ]
                    //     })
                    // }

                    // addToolCallMessageToAiState(aiState, methodSchema.operationId, toolCallId, { payloadGeneratedByModel }, response)
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
                                        toolName: methodSchema.operationId,
                                        toolCallId,
                                        args: { payloadGeneratedByModel }
                                    }
                                ]
                            },
                            {
                                id: nanoid(),
                                role: 'tool',
                                content: [
                                    {
                                        type: 'tool-result',
                                        toolName: methodSchema.operationId,
                                        toolCallId,
                                        result: response
                                    }
                                ]
                            }
                        ]
                    })
                    
                    // allow AI to comment on tool response by calling streamUI
                    console.log('making follow up response:', aiState, agentConfig, {})
                    const aiResponse = await getResponse(
                        aiState,
                        agentConfig,
                        {} // empty dictionary of toolID:descriptions TODO we will want to enable to model to call tools in sequence
                    )
                    //   TODO update AI state
                    console.log('Ai response:', aiResponse)
                    return (
                        // TODO implement sequential function calling by changing dictionary above
                        // TODO only return openAI icon for outer-most call of recursive tool calling
                        <div className="group relative flex items-start md:-ml-12">
                            <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                                <IconOpenAI />
                            </div>
                            {/* TODO correct small left indentation error of follow-up response */}
                            <div className='ml-4 flex flex-col gap-4'>
                                <div className="text-muted-foreground flex-1 space-y-2 overflow-hidden px-1">
                                    {`Talked to ${endpoint} to call ${methodSchema.operationId}`}
                                </div>
                                <div className='flex-1 space-y-2 overflow-hidden px-1'>
                                    {aiResponse.value}
                                </div>
                            </div>
                        </div>
                    )

                }
            }

            tools[methodSchema.operationId] = toolDefinition
        }   
    }

    console.log('returning tools', tools)

    return tools
}

async function makeToolApiRequest(accessToken, endpoint, payload = null, method = 'GET') {
    
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    
    const options = {
        method,
        headers
    };
    
    if (payload) {
        options.body = JSON.stringify(payload);
    }

    try {
        const response = await fetch(endpoint, options);
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized: Invalid or expired token.');
            }
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Response:', data);
        return data;
    } catch (error) {
        console.error('Failed to make API request:', error);
        return `Failed to make API request: ${error}`;
    }
}

export function ToolCallCompleteMessage({text}) {
    return (
        <div className="group relative flex items-start md:-ml-12">
            <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                <IconOpenAI />
            </div>
            <div className="text-muted-foreground ml-4 flex-1 space-y-2 overflow-hidden px-1">
                {text}
            </div>
        </div>
    )
}

export function ToolCallLoadingStateMessage({text}) {
  return (
        <div className="group relative flex items-start md:-ml-12">
            <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                <IconOpenAI />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                <AnimatedShinyText className='m-0'>
                    {text}
                </AnimatedShinyText> 
            </div>
        </div>
  )
}