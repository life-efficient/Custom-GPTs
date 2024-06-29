import Retell from 'retell-sdk';

export async function registerCall(body) {

    // console.log('key:', process.env.RETELL_API_KEY)
    // const retell = new Retell({
    //     apiKey: process.env.RETELL_API_KEY,
    // });
    // const response = await retell.call.register(body);

    const response = await fetch('https://api.retellai.com/create-call', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    console.log('response:', response)

    return response
}
