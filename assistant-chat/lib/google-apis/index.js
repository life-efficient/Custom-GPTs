"use server"
import { gapi } from 'gapi-script';


const googleSignIn = async () => {
    gapi.auth2.getAuthInstance().signIn().then((response) => {
        console.log('User signed in:', response);
        // Handle the authenticated user and access their Google Drive
    }).catch((error) => {
        console.error('Error signing in:', error);
    });
}

export { googleSignIn }