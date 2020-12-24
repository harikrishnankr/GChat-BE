import { OAuth2Client, TokenPayload } from "google-auth-library";
import { G_AUTH_CLIENT_ID } from "../config";

const client = new OAuth2Client(G_AUTH_CLIENT_ID);

const googleAuth = async (idToken: string) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: G_AUTH_CLIENT_ID
    });
    const payload = ticket.getPayload() || {};
    const { sub, email, name, picture } = (payload as TokenPayload);

    return { clientId: sub, email, name, picture };
};

export default googleAuth;