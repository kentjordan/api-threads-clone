import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import extractBody from "~/utils/extractors/extract_body";

const validateBody = <B>(validator: ZodType) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const body = extractBody<B>(req);

        try {
            await validator.parseAsync(body);
            next();
        } catch (error: unknown) {
            next(error);
        }

    }

}

export default validateBody;