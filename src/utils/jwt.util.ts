import jwt from 'jsonwebtoken';

interface IPayload {
    id: string
}

const generateAuthdTokens = async (payload: IPayload) => {

    const ACCESS_TOKEN_EXPIRY = '8h';
    const REFRESH_TOKEN_EXPIRY = '7d';

    const access_token = jwt.sign({ ...payload }, process.env.SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refresh_token = jwt.sign({ access_token }, process.env.SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });

    return {
        access_token,
        refresh_token,
    }
}

export {
    generateAuthdTokens
}