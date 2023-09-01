import { verify } from "argon2";
import { NextFunction } from "express";
import { IAuthLoginInput } from "~/@types/models/auth";
import InvalidPassword from "~/errors/InvalidPassword";
import RefreshTokenError from "~/errors/RefreshTokenError";
import { generateAuthdTokens } from "~/utils/jwt.util";

const login = async (credentials: IAuthLoginInput, next: NextFunction) => {

    try {

        const user = await prismaCli.users.findFirstOrThrow({
            select: { id: true, password: true },
            where: {
                email: credentials.email,
            }
        });

        if (user.password && await verify(user.password, credentials.password)) {

            const { access_token, refresh_token } = await generateAuthdTokens({ id: user.id });

            const hasRefreshToken = await prismaCli.refresh_tokens.findFirstOrThrow({
                select: { refresh_token: true },
                where: {
                    user_id: user.id
                }
            });

            if (hasRefreshToken) {

                await prismaCli.refresh_tokens.update({
                    data: {
                        refresh_token,
                    },
                    where: {
                        user_id: user.id
                    }
                });

                return {
                    access_token,
                    refresh_token
                }
            }

            const createdRefreshToken = await prismaCli.refresh_tokens.create({
                select: { refresh_token: true },
                data: {
                    user_id: user.id,
                    refresh_token
                }
            });

            if (createdRefreshToken) {
                return {
                    access_token,
                    refresh_token
                }
            }

            throw new RefreshTokenError("Error while creating refresh token");
        }

        throw new InvalidPassword('Invalid password');

    } catch (error: unknown) {
        next(error);
    }
}

export default login;