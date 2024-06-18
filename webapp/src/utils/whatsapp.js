/**
 * Send a WhatsApp message using the Facebook Graph API
 * @param {string} token - The access token for authentication
 * @param {string} to - The recipient's phone number
 * @param {string} templateName - The name of the template to use
 * @param {string} languageCode - The language code for the template
 */
export async function sendMessage(token, to, templateName, languageCode = 'en_US') {
  const url = 'https://graph.facebook.com/v19.0/275044369035453/messages';

  const payload = {
    messaging_product: "whatsapp",
    to: to,
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode }
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');


// Step 1: Upload the PDF
async function uploadMedia() {
  // // Replace these with your actual values
  // const accessToken = 'YOUR_ACCESS_TOKEN';
  // const phoneNumberId = 'YOUR_PHONE_NUMBER_ID';
  // const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';
  // const pdfFilePath = 'path/to/yourfile.pdf';
  const form = new FormData();
  form.append('file', fs.createReadStream(pdfFilePath));

  const uploadResponse = await axios.post(
    `https://graph.facebook.com/v13.0/${phoneNumberId}/media`,
    form,
    {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  return uploadResponse.data.id;
}

// Step 2: Send the WhatsApp message with the PDF
async function sendMediaMessage(mediaId) {
  const payload = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": recipientPhoneNumber,
    "type": "document",
    "document": {
      "id": mediaId,
      "caption": "Here is your document",
      "filename": "yourfile.pdf"
    }
  };

  const messageResponse = await axios.post(
    `https://graph.facebook.com/v13.0/${phoneNumberId}/messages`,
    payload,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return messageResponse.data;
}

// // Execute the steps
// async function main() {
//   try {
//     const mediaId = await uploadMedia();
//     const messageResponse = await sendMessage(mediaId);
//     console.log('Message sent successfully:', messageResponse);
//   } catch (error) {
//     console.error('Error sending message:', error.response ? error.response.data : error.message);
//   }
// }

// main();
