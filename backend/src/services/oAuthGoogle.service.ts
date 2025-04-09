import dotenv from 'dotenv';
dotenv.config();

// const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

// const GOOGLE_CALLBACK_URL = "http://localhost:3000/auth/google/callback";

const GOOGLE_OAUTH_SCOPES = [
"https%3A//www.googleapis.com/auth/userinfo.email",

"https%3A//www.googleapis.com/auth/userinfo.profile",
];

// const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;

class OAuthGoogleService {
    async getRedirectConsentScreenURL():Promise<string | null>{
        const state = "some_state";
        const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
        
        const GOOGLE_OAUTH_CONSENT_SCREEN_URL = 
            `${process.env.GOOGLE_OAUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;

        console.log(`Google Consent screen url ${GOOGLE_OAUTH_CONSENT_SCREEN_URL}`);
        return GOOGLE_OAUTH_CONSENT_SCREEN_URL;
        
    }

    async getTokenData(code: string) {
        try {
            const data = {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_CALLBACK_URL,
                grant_type: 'authorization_code',
            }

            const googleAccessTokenUrl = process.env.GOOGLE_ACCESS_TOKEN_URL;
            if (!googleAccessTokenUrl) {
                throw new Error('GOOGLE_ACCESS_TOKEN_URL is not defined');
            }

            const response = await fetch(googleAccessTokenUrl, {
                method: 'POST',
                body: JSON.stringify(data),
            })

            if(!response.ok) throw new Error(`Error: getting token from Google ${response.status} - ${response.statusText}`)

            const accessTokenData = await response.json()
            return accessTokenData;

        } catch (error) {
            throw error
        }
    }
    async getDataFromToken(accessTokenData: {id_token : string, access_token: string}){
        try {
            const { access_token } = accessTokenData;
            if(!access_token) throw new Error(`Error: Not found access token in Google's response`)

            const tokenInfoResponse  = await fetch(
                `${process.env.GOOGLE_TOKEN_INFO_URL}?access_token=${access_token}`
            )
            if(!tokenInfoResponse) throw new Error(`Error: getting data from token`)

            const dataInfo = await tokenInfoResponse.json()

            return dataInfo
        } catch (error) {
            throw error;
        }
    }
}

export default new OAuthGoogleService();