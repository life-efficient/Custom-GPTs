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

export function makeOutboundCall({to_number='+447765892392', agent_id='a355652343eab572087abc77adfecb34'}) {
    body = {
        agent_id,
        from_number: '+15626693964',
        // audio_websocket_protocol: 'web',
        // audio_encoding: 's16le',
        end_call_after_silence_ms: 10000,
        to_number,
        direction: 'outbound',
        metadata: {},
        retell_llm_dynamic_variables: {},
        ...body
    }
    return registerCall(body)
}