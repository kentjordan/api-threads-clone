import { NextFunction, Response } from "express"
import { IAuthLoginInput, IAuthRefreshInput } from "~/@types/models/auth"
import { IRequestCustomBody } from "~/@types/request"
import extractBody from "~/utils/extractors/extract_body"
import * as AuthModels from "~/models/auth";
import extractUser from "~/utils/extractors/extract_user";
import extractUserFromTokenOnHeader from "~/utils/extractors/extractUserFromTokenOnHeader";

const login = async (req: IRequestCustomBody<IAuthLoginInput>, res: Response, next: NextFunction) => {

    const credentials = extractBody<IAuthLoginInput>(req);

    const loggedIn = await AuthModels.login(credentials, next);

    if (loggedIn) {
        res.status(200).json({ ...loggedIn });
    }

}

const refreshTokens = async (req: IRequestCustomBody<IAuthRefreshInput>, res: Response, next: NextFunction) => {

    const { id, token } = extractUserFromTokenOnHeader(req, 'refresh');

    const refreshedTokens = await AuthModels.refreshTokens({ user_id: id as string, refresh_token: token }, next);

    if (refreshedTokens) {
        res.status(200).json({ ...refreshedTokens });
    }

}

export {
    login,
    refreshTokens
}