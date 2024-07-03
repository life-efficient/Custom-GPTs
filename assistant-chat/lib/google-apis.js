import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
const API_KEY = 'YOUR_API_KEY';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/drive.file";

function useGoogleDrive() {
    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: process.env.GOOGLE_CLIENT_SECRET,
                clientId: process.env.GOOGLE_CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            });
        }
        gapi.load('client:auth2', start);
    }, []);
}

export default useGoogleDrive;
