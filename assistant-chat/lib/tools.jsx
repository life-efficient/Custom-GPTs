import { object, z } from 'zod'
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { nanoid } from 'nanoid'
import { IconOpenAI } from '@/components/ui/icons'

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

export default function getTool(toolName, accessTokens){



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

            // the parameters may or may not be based on the schema in the components object of the API spec
            // TODO? possibly ensure that the api spec is generated without using references
            // references are used to deduplicate the schema, but this may not be necessary for our purposes, as the schema can be generated by an AI system
            // if schema uses references

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

            let parameters //TODO: add some typecript types here

            if (methodSchema.requestBody) {
                const schemaRef = methodSchema.requestBody.content['application/json'].schema['$ref']

                let schema = schemaRef.split('/').pop()
                console.log('schema:', schema) 
                parameters = tool.components.schemas[schema]

                parameters = convertSchemaToParams(parameters)

            } else {
                parameters = methodSchema.parameters // TODO get this to work for more complicated "simple" schemass

                parameters = z.object(parameters.reduce((acc, param) => {
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
                }, {}))
            }
            // This function turns the params into this format using zod:
            // parameters: z.object({
            //         example: z.string().describe('Example parameter')
            //     }),

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

            // // SIMPLE EXAMPLE
            // getSpreadsheetValuesrange: z.object({ 
            //     spreadsheetId: z.string().describe('The ID of the spreadsheet to retrieve data from.'),
            //     range: z.string().describe('The range of cells to retrieve data from'),
            // })


            const toolDefinition = {
                description: methodSchema.summary, // TODO: check if this is right
                parameters,
                generate: async function*(payloadGeneratedByModel){
                    yield (
                        <ToolCallLoadingStateMessage text={`Talking to ${endpoint} to call ${methodSchema.operationId}`} />
                    )

                    // TODO get app-relevant access token... this one only works for the latest retrieved access token
                    const accessToken = accessTokens
                    // TODO update /access to store different accesstokens within this object, instead of just a string for the latest accesstoken
                    // TODO check for access token in localstorage
                    // TODO refresh access token if expired

                    // TODO move params into respective endpoint query string params or payload

                    const response = await makeToolApiRequest(accessToken, endpoint, payloadGeneratedByModel, method)
                    console.log('response', response)
                    //  const aiState = getMutableAIState<typeof AI>()
                    // TODO update aiState as below
                    
                    return <ToolCallCompleteMessage text={`Talked to ${endpoint} to call ${methodSchema.operationId}`} />
                }
            }

            tools[methodSchema.operationId] = toolDefinition
        }   
    }

    console.log('returning tools', tools)

        // TODO current goal: get the model to generate the correct tool params dynamically, straight from the openAPI spec

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
        return null;
    }
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