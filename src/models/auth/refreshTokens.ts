import { NextFunction } from "express";
import { generateAuthdTokens } from "~/utils/jwt.util";
import jwt from 'jsonwebtoken';

interface IRefreshToken {
    refresh_token: string,
    user_id: string
}

const refreshTokens = async (credentials: IRefreshToken, next: NextFunction) => {

    try {

        const user = await prismaCli.refresh_tokens.findFirstOrThrow({
            where: {
                refresh_token: credentials.refresh_token,
                user_id: credentials.user_id
            }
        });

        if (user.refresh_token) {

            jwt.verify(user.refresh_token, process.env.SECRET_KEY);

            const { access_token, refresh_token } = await generateAuthdTokens({ id: credentials.user_id });

            await prismaCli.refresh_tokens.update({
                data: {
                    refresh_token,
                },
                where: {
                    user_id: credentials.user_id
                }
            });

            return {
                access_token,
                refresh_token
            }
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default refreshTokens;