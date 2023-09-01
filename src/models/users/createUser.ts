import { NextFunction } from "express";
import { IUserCreateInput } from "~/@types/models/users";
import { generateAuthdTokens } from "~/utils/jwt.util";
import { hash } from 'argon2';

const createUser = async (data: IUserCreateInput, next: NextFunction) => {

    try {

        const hashedPassword = await hash(data.password);

        const createdUser = await prismaCli.users.create({
            select: { id: true },
            data: {
                ...data,
                password: hashedPassword
            }
        });

        const { access_token, refresh_token } = await generateAuthdTokens(createdUser);

        return {
            access_token,
            refresh_token
        };

    } catch (error: unknown) {
        next(error);
    }
}

export default createUser;