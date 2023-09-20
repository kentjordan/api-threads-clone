import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { IRequestCustomParams } from "~/@types/request";
import extractReqParams from "~/utils/extractors/extractReqParams";

const validateParams = <B>(validator: ZodType) => {

    return async (req: IRequestCustomParams<B>, res: Response, next: NextFunction) => {

        const body = extractReqParams<B>(req);

        try {
            await validator.parseAsync(body);
            next();
        } catch (error: unknown) {
            next(error);
        }

    }

}

export default validateParams;