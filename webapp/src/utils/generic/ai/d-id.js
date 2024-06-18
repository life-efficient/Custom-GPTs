// import sdkCreator from 'api'
// const sdk = sdkCreator('@d-id/v4.2.0#bk13ostlri055d9');
const sdk = require('api')('@d-id/v4.2.0#2m7z3clsj01quf');


sdk.auth(process.env.D_ID_API_KEY);

export const createTalk = async ({script, img_path, voiceId}) => {
    const response = await sdk.createTalk(
        {
            source_url: img_path,
            script: {
                type: 'text',
                subtitles: 'false',
                provider: {type: 'elevenlabs', voice_id: voiceId},
                ssml: 'false',
                input: script,
            },
            config: {
                fluent: 'true', 
                pad_audio: 5,
                stitch: true
            }
        },
        {'x-api-key-external': JSON.stringify({elevenlabs: process.env.ELEVENLABS_API_KEY})}
    )
    return response.data.id
}

export const createIdleVideo = async ({img_path }) => {
    console.log(process.env.D_ID_API_KEY)
    console.log(process.env.ELEVENLABS_API_KEY)
    
    const response = await sdk.createTalk(
        {
            source_url: img_path,
            script: {
                type: 'audio',
                audio_url: 'https://videofunnels-videos-prod.s3.eu-west-2.amazonaws.com/silent_audio.mp3'
            },
        },
        {'x-api-key-external': JSON.stringify({elevenlabs: process.env.ELEVENLABS_API_KEY})}
    )
    return response.data.id
}


// export const createClip = async ({script}) => {
//     // FYI ONLY WORKS WITH PRE-SET PRESENTERS (use createTalk instead for custom presenter)

//     const response = await sdk.createClip(
//         {
//             presenter_id: "rian-lZC6MmWfC1",
//             script: {
//                 type: 'text',
//                 // subtitles: 'false',
//                 provider: {type: 'elevenlabs', voice_id: '21m00Tcm4TlvDq8ikWAM'},
//                 ssml: 'false',
//                 input: script,
//             },
//             config: {result_format: 'mp4'},
//             presenter_config: {crop: {type: 'rectangle', rectangle: {bottom: 1.0, top: 0.0, left: 0.0, right: 1.0}}},
//         }, 
//         // {'x-api-key-external': process.env.ELEVENLABS_API_KEY}
//     )

//     console.log(response)
//     return response
// }

export const getVideoURLById = async (id) => {
    return new Promise((resolve, reject) => {

        let idx = 0
        const interval = setInterval(async () => {
            const response = await sdk.getTalk({id})
            if (response.data.status === 'done') {
                console.log('done:', response.data.result_url)
                clearInterval(interval)
                resolve(response.data.result_url)
            }
            else {
                console.log('waiting for video to be done')
                idx++;
            }
        }, 5000)
    })    
}


// export const createAnimation = async ({img_path="public/data/Profile.jpg", driver_url="bank://nostalgia"}) => {
//     const response = await sdk.createAnimation(
//         {
//             source_url: img_path,
//             driver_url,
//             config: {
//                 stitch: true
//             }
//         },
//     )
//     return response
// }

// export const getAnimationURLById = async (id) => {
//     return new Promise((resolve, reject) => {

//         let idx = 0
//         const interval = setInterval(async () => {
//             const response = await sdk.getAnimation({id})
//             if (response.data.status === 'done') {
//                 console.log('done:', response.data.result_url)
//                 clearInterval(interval)
//                 resolve(response.data.result_url)
//             }
//             else {
//                 console.log('waiting for video to be done')
//                 idx++;
//             }
//         }, 5000)
//     })    
// }