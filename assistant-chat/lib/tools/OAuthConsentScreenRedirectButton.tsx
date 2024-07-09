interface OAuthConsentScreenRedirectButtonProps {
    authUrl: string;
    clientId: string;
    scopes: string;
}

const OAuthConsentScreenRedirectButton = (oAuthConfig: OAuthConsentScreenRedirectButtonProps) => {
	
    // const CLIENT_ID = '562576427978-irfv775j08db68mo1qj98o9m0fkhdi30.apps.googleusercontent.com';
    // const REDIRECT_URI = 'http://localhost:3000/access';  // Ensure this matches the one configured in Google Cloud Console
    // const SCOPE = 'https://www.googleapis.com/auth/drive';
    // const AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=${encodeURIComponent(SCOPE)}&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_id=${CLIENT_ID}`;

    // encode the url parameters
    const urlParams = new URLSearchParams({
        client_id: oAuthConfig.clientId,
        scope: oAuthConfig.scopes,
        redirect_uri: 'http://localhost:3000/access',
        response_type: 'token',
        include_granted_scopes: 'true',
        state: 'state_parameter_passthrough_value'
    }).toString();

    const href = `${oAuthConfig.authUrl}?${urlParams}`

    return (
        <a href={href} className='p-24 my-4 rounded bg-white text-black z-10'>
            Get Access Token
        </a>
    );
};

export default OAuthConsentScreenRedirectButton;