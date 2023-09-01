import { NextFunction, Response } from "express"
import { IAuthLoginInput } from "~/@types/models/auth"
import { IRequestCustomBody } from "~/@types/request"
import extractBody from "~/utils/extractors/extract_body"
import * as AuthModels from "~/models/auth";

const login = async (req: IRequestCustomBody<IAuthLoginInput>, res: Response, next: NextFunction) => {

    const credentials = extractBody<IAuthLoginInput>(req);

    const loggedIn = await AuthModels.login(credentials, next);

    if (loggedIn) {
        res.status(200).json({ ...loggedIn });
    }

}

export {
    login,
}