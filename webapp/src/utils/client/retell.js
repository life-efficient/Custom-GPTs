// utils/client/retell.js

import apiClient from "../generic/api";

export async function registerCall(body){
    
    body = {
        agent_id: 'a355652343eab572087abc77adfecb34',
        from_number: '+15626693964',
        audio_websocket_protocol: 'web',
        audio_encoding: 's16le',
        sample_rate: 24000,
        end_call_after_silence_ms: 10000,
        // to_number = '+447765892392',
        // direction = 'inbound',
        metadata: {},
        retell_llm_dynamic_variables: {},
        ...body
    }

    const response = await apiClient.post('/register-call', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    console.log('client response:', response)

    return response;
}
