const axios = require("axios");
const sdk = require('api')('@movio-api/v4.0.2#g4bja1rlr98vcco');

sdk.auth(process.env.HEYGEN_API_KEY);

// BASH
// curl -X POST 'https://api.heygen.com/v1/video.generate' \
// -H 'X-Api-Key: <your-api-key>' \
// -H 'Content-Type: application/json' \
// -d '{
//   "background": "#ffffff",
//   "clips": [
//     {
//       "avatar_id": "Daisy-inskirt-20220818",
//       "avatar_style": "normal",
//       "input_text": "Welcome to HeyGen API",
//       "offset": {
//         "x": 0,
//         "y": 0
//       },
//       "scale": 1,
//       "voice_id": "1bd001e7e50f421d891986aad5158bc8"
//     }
//   ],
//   "ratio": "16:9",
//   "test": true,
//   "version": "v1alpha"
// }'

// JS
export const generateVideoFromScript = async (script) => {
  const url = "https://api.heygen.com/v1/video.generate";

  const body = JSON.stringify({
    background: "#ffffff",
    clips: [
      {
        avatar_id: "josh_lite3_20230714",
        avatar_style: "normal",
        input_text: script,
        offset: {
          x: 0,
          y: 0,
        },
        scale: 1,
        voice_id: "b2ddcef2b1594794aa7f3a436d8cf8f2",
      },
    ],
    ratio: "16:9",
    test: true,
    version: "v1alpha",
  });

  const options = {
    headers: {
      "X-Api-Key": process.env.HEYGEN_API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(url, body, options);
    const video = res.data;
    return video;
  } catch (e) {
    console.error("Video Error: " + e?.response?.status, e?.response?.data);
    return null;
  }
}


//BASH
// curl --request GET \
//      --url https://api.heygen.com/v2/avatars \
//      --header 'accept: application/json' \
//      --header 'x-api-key: NzRiMTgzNjVhZTQzNDFlOThkZTI4NjlkMmRmZDMzZjItMTcwNTgwODIyNQ'

// JS
export const listAvatars = async () => {
  const url = "https://api.heygen.com/v2/avatars";

  const options = {
    headers: {
      "X-Api-Key": process.env.HEYGEN_API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(url, options);
    const avatars = res.data;
    return avatars;
  } catch (e) {
    console.error("Video Error: " + e?.response?.status, e?.response?.data);
    return null;
  }
}

// BASH
// curl --request GET \
//      --url https://api.heygen.com/v2/voices \
//      --header 'accept: application/json' \
//      --header 'x-api-key: NzRiMTgzNjVhZTQzNDFlOThkZTI4NjlkMmRmZDMzZjItMTcwNTgwODIyNQ'


// JS
export const listVoices = async () => {
  const url = "https://api.heygen.com/v2/voices";

  const options = {
    headers: {
      "X-Api-Key": process.env.HEYGEN_API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(url, options);
    const voices = res.data;
    return voices;
  } catch (e) {
    console.error("Video Error: " + e?.response?.status, e?.response?.data);
    return null;
  }
}


//BASH 
// curl --request GET \
//      --url 'https://api.heygen.com/v1/video_status.get?video_id=6eaab25c61294f308623c14863c1f175' \
//      --header 'accept: application/json' \
//      --header 'x-api-key: NzRiMTgzNjVhZTQzNDFlOThkZTI4NjlkMmRmZDMzZjItMTcwNTgwODIyNQ=='

export const retrieveVideoById = async (video_id) => {
  const url = `https://api.heygen.com/v1/video_status.get?video_id=${video_id}`;

  const options = {
    headers: {
      "X-Api-Key": process.env.HEYGEN_API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(url, options);
    const video = res.data;
    return video;
  } catch (e) {
    console.error("Video Error: " + e?.response?.status, e?.response?.data);
    return null;
  }
}