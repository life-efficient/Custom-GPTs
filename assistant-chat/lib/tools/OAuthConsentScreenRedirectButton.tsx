interface OAuthConsentScreenRedirectButtonProps {
    message?: string;
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
        redirect_uri: 'http://localhost:3000/access', // TODO pass in agent and state
        response_type: 'token',
        include_granted_scopes: 'true',
        state: 'state_parameter_passthrough_value'
    }).toString();

    const href = `${oAuthConfig.authUrl}?${urlParams}`

    return (
        <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex items-start gap-4">
            <span className="text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                <path
                    fill-rule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                />
                </svg>
            </span>

            <div className="flex-1">
            <strong className="block font-medium text-gray-900"> Gimme your sh** 🔫 </strong>

            <p className="mt-1 text-sm text-gray-700">{oAuthConfig.message}</p>

            <div className="mt-4 flex gap-2">
                <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-black hover:bg-indigo-700" //add max height to this line
                >
                    <a href={href} className='text-sm'>
                        Get Access Token
                    </a>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-1 w-1"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                </svg>
                </a>

                <button className="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-50">
                <span className="text-sm">Revert</span>
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default OAuthConsentScreenRedirectButton;