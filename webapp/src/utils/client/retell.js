// utils/client/retell.js

import apiClient from "../generic/api";

export async function registerCall({
    agent_id,
    from_number,
    audio_websocket_protocol = 'web',
    audio_encoding = 's16le',
    sample_rate = 24000,
    end_call_after_silence_ms = 10000,
    to_number = '',
    direction = 'inbound',
    metadata = {},
    retell_llm_dynamic_variables = {}
}) {
    const response = await apiClient.post('/register-call', {
        method: 'POST',
        headers: {
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

    return response;
}
