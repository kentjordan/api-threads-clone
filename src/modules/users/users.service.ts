import { NextFunction, Response } from "express";
import { IUserCreateInput } from "~/@types/models/users";
import { IRequestCustomBody } from "~/@types/request";
import * as UserModels from "~/models/users";
import extractBody from "~/utils/extractors/extract_body";

const createUser = async (req: IRequestCustomBody<IUserCreateInput>, res: Response, next: NextFunction) => {

    const data = extractBody<IUserCreateInput>(req);

    const createdUser = await UserModels.createUser(data, next);

    if (createdUser) {
        res.status(200).json({
            ...createdUser
        });
    }

}

export {
    createUser
}