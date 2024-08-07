//   listStocks: {
//     description: 'List three imaginary stocks that are trending.',
//     parameters: z.object({
//       stocks: z.array(
//         z.object({
//           symbol: z.string().describe('The symbol of the stock'),
//           price: z.number().describe('The price of the stock'),
//           delta: z.number().describe('The change in price of the stock')
//         })
//       )
//     }),
//     generate: async function* ({ stocks }) {
//       yield (
//         <BotCard>
//           <StocksSkeleton />
//         </BotCard>
//       )

//       await sleep(1000)

//       const toolCallId = nanoid()

//       aiState.done({
//         ...aiState.get(),
//         messages: [
//           ...aiState.get().messages,
//           {
//             id: nanoid(),
//             role: 'assistant',
//             content: [
//               {
//                 type: 'tool-call',
//                 toolName: 'listStocks',
//                 toolCallId,
//                 args: { stocks }
//               }
//             ]
//           },
//           {
//             id: nanoid(),
//             role: 'tool',
//             content: [
//               {
//                 type: 'tool-result',
//                 toolName: 'listStocks',
//                 toolCallId,
//                 result: stocks
//               }
//             ]
//           }
//         ]
//       })

//       return (
//         <BotCard>
//           <Stocks props={stocks} />
//         </BotCard>
//       )
//     }
//   },
//   showStockPrice: {
//     description:
//       'Get the current stock price of a given stock or currency. Use this to show the price to the user.',
//     parameters: z.object({
//       symbol: z
//         .string()
//         .describe(
//           'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
//         ),
//       price: z.number().describe('The price of the stock.'),
//       delta: z.number().describe('The change in price of the stock')
//     }),
//     generate: async function* ({ symbol, price, delta }) {
//       yield (
//         <BotCard>
//           <StockSkeleton />
//         </BotCard>
//       )

//       await sleep(1000)

//       const toolCallId = nanoid()

//       aiState.done({
//         ...aiState.get(),
//         messages: [
//           ...aiState.get().messages,
//           {
//             id: nanoid(),
//             role: 'assistant',
//             content: [
//               {
//                 type: 'tool-call',
//                 toolName: 'showStockPrice',
//                 toolCallId,
//                 args: { symbol, price, delta }
//               }
//             ]
//           },
//           {
//             id: nanoid(),
//             role: 'tool',
//             content: [
//               {
//                 type: 'tool-result',
//                 toolName: 'showStockPrice',
//                 toolCallId,
//                 result: { symbol, price, delta }
//               }
//             ]
//           }
//         ]
//       })

//       return (
//         <BotCard>
//           <Stock props={{ symbol, price, delta }} />
//         </BotCard>
//       )
//     }
//   },
//   showStockPurchase: {
//     description:
//       'Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.',
//     parameters: z.object({
//       symbol: z
//         .string()
//         .describe(
//           'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
//         ),
//       price: z.number().describe('The price of the stock.'),
//       numberOfShares: z
//         .number()
//         .describe(
//           'The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.'
//         )
//     }),
//     generate: async function* ({ symbol, price, numberOfShares = 100 }) {
//       const toolCallId = nanoid()

//       if (numberOfShares <= 0 || numberOfShares > 1000) {
//         aiState.done({
//           ...aiState.get(),
//           messages: [
//             ...aiState.get().messages,
//             {
//               id: nanoid(),
//               role: 'assistant',
//               content: [
//                 {
//                   type: 'tool-call',
//                   toolName: 'showStockPurchase',
//                   toolCallId,
//                   args: { symbol, price, numberOfShares }
//                 }
//               ]
//             },
//             {
//               id: nanoid(),
//               role: 'tool',
//               content: [
//                 {
//                   type: 'tool-result',
//                   toolName: 'showStockPurchase',
//                   toolCallId,
//                   result: {
//                     symbol,
//                     price,
//                     numberOfShares,
//                     status: 'expired'
//                   }
//                 }
//               ]
//             },
//             {
//               id: nanoid(),
//               role: 'system',
//               content: `[User has selected an invalid amount]`
//             }
//           ]
//         })

//         return <BotMessage content={'Invalid amount'} />
//       } else {
//         aiState.done({
//           ...aiState.get(),
//           messages: [
//             ...aiState.get().messages,
//             {
//               id: nanoid(),
//               role: 'assistant',
//               content: [
//                 {
//                   type: 'tool-call',
//                   toolName: 'showStockPurchase',
//                   toolCallId,
//                   args: { symbol, price, numberOfShares }
//                 }
//               ]
//             },
//             {
//               id: nanoid(),
//               role: 'tool',
//               content: [
//                 {
//                   type: 'tool-result',
//                   toolName: 'showStockPurchase',
//                   toolCallId,
//                   result: {
//                     symbol,
//                     price,
//                     numberOfShares
//                   }
//                 }
//               ]
//             }
//           ]
//         })

//         return (
//           <BotCard>
//             <Purchase
//               props={{
//                 numberOfShares,
//                 symbol,
//                 price: +price,
//                 status: 'requires_action'
//               }}
//             />
//           </BotCard>
//         )
//       }
//     }
//   },
//   getEvents: {
//     description:
//       'List funny imaginary events between user highlighted dates that describe stock activity.',
//     parameters: z.object({
//       events: z.array(
//         z.object({
//           date: z
//             .string()
//             .describe('The date of the event, in ISO-8601 format'),
//           headline: z.string().describe('The headline of the event'),
//           description: z.string().describe('The description of the event')
//         })
//       )
//     }),
//     generate: async function* ({ events }) {
//       yield (
//         <BotCard>
//           <EventsSkeleton />
//         </BotCard>
//       )

//       await sleep(1000)

//       const toolCallId = nanoid()

//       aiState.done({
//         ...aiState.get(),
//         messages: [
//           ...aiState.get().messages,
//           {
//             id: nanoid(),
//             role: 'assistant',
//             content: [
//               {
//                 type: 'tool-call',
//                 toolName: 'getEvents',
//                 toolCallId,
//                 args: { events }
//               }
//             ]
//           },
//           {
//             id: nanoid(),
//             role: 'tool',
//             content: [
//               {
//                 type: 'tool-result',
//                 toolName: 'getEvents',
//                 toolCallId,
//                 result: events
//               }
//             ]
//           }
//         ]
//       })

//       return (
//         <BotCard>
//           <Events props={events} />
//         </BotCard>
//       )
//     }
//   }
    

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