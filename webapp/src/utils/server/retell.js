// utils/server/retell.js

export async function registerCall({ agent_id, audio_websocket_protocol, audio_encoding, sample_rate, end_call_after_silence_ms, from_number, to_number, direction, metadata, retell_llm_dynamic_variables }) {

    console.log('key:', process.env.RETELL_API_KEY)
    const response = await fetch('https://api.retellai.com/register-call', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            agent_id,
            audio_websocket_protocol,
            audio_encoding,
            sample_rate,
            end_call_after_silence_ms,
            from_number,
            to_number,
            direction,
            metadata,
            retell_llm_dynamic_variables
        })
    });

    return response
}
