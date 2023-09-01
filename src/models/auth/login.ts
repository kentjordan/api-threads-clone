import { verify } from "argon2";
import { NextFunction } from "express";
import { IAuthLoginInput } from "~/@types/models/auth";
import InvalidPassword from "~/errors/InvalidPassword";
import { generateAuthdTokens } from "~/utils/jwt.util";

const login = async (credentials: IAuthLoginInput, next: NextFunction) => {

    try {

        const user = await prismaCli.users.findFirstOrThrow({
            select: { id: true, password: true },
            where: {
                email: credentials.email,
            }
        })

        if (user.password && await verify(user.password, credentials.password)) {

            const { access_token, refresh_token } = await generateAuthdTokens(user);

            return {
                access_token,
                refresh_token
            }

        }

        throw new InvalidPassword('Invalid password');

    } catch (error: unknown) {
        next(error);
    }
}

export default login;