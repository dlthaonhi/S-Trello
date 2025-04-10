
const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_CALLBACK_URL = "http://localhost:3000/auth/google/callback";

const GOOGLE_OAUTH_SCOPES = [
"https://www.googleapis.com/auth/userinfo.email",
"https://www.googleapis.com/auth/userinfo.profile",
];

class OAuthGoogleService {
    async getRedirectConsentScreenURL():Promise<string | null>{
        const state = "some_state";
        const scopes = GOOGLE_OAUTH_SCOPES[0];
        const GOOGLE_OAUTH_CONSENT_SCREEN_URL = 
            `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
        console.log(`Google Consent screen url ${GOOGLE_OAUTH_CONSENT_SCREEN_URL}`);
        return GOOGLE_OAUTH_CONSENT_SCREEN_URL;
        
    }
}

export default new OAuthGoogleService();