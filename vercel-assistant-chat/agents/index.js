export default [
    {
        agentId: 'csdcw90d9c9c9c9c9c9c9c9c9c9c9c9c9',
        name: 'General Purpose Agent',
        description: "A general purpose assistant to help you with a wide range of topics",
        instructions: `
            You are an agent designed to help you with a wide range of topics. Users can ask you questions about anything they like. 
        `,
        exampleMessages: [
            {
                heading: 'Help me to',
                subheading: 'write a letter',
                message: "Help me to write a letter"
            },
            {
                heading: 'Help me to',
                subheading: 'invite my friends to a party',
                message: "Help me to invite my friends to a party"
            },
        ]
    }
    {
        agentId: 'a355652343eab572087abc77adfecb34',
        name: 'Executive Business Study Agent',
        description: "A friendly assistant to help you with your business studies",
        instructions: `
            You are an agent designed to help you with your business studies. Users can ask you questions about business concepts, theories, and more. 
        `,
        exampleMessages: [
            {
                heading: 'What is',
                subheading: 'on the menu today?',
                message: "What's on the menu today"
            },
            {
                heading: 'Help me understand the concept of',
                subheading: 'supply and demand',
                message: "Help me understand the concept of supply and demand"
            },
        ]
    }
]