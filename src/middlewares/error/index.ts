import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { PrismaError } from "prisma-error-enum";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import InvalidPassword from "~/errors/InvalidPassword";
import RefreshTokenError from "~/errors/RefreshTokenError";

const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {

    console.log(err);

    if (err instanceof PrismaClientKnownRequestError) {

        if (err.code === PrismaError.UniqueConstraintViolation) {
            res.status(422).json({
                message: 'Given resource is not available.',
                db_err_type: 'Unique Constraint Violation',
                type: 'Database Error',
            });
            return;
        }

        if (err.code === PrismaError.InconsistentColumnData) {
            res.status(422).json({
                message: 'Invalid given resource.',
                db_err_type: 'Inconsistent Column Data',
                type: 'Database Error',
            });
            return;
        }

        if (err.code === PrismaError.RecordsNotFound) {
            res.status(404).json({
                message: 'Given resource was not found.',
                db_err_type: 'Records Not Found',
                type: 'Database Error',
            });
            return;
        }

        if (err.code === PrismaError.ForeignConstraintViolation) {
            res.status(404).json({
                message: 'No records found on all tables for the given resource.',
                db_err_type: 'Foreign Constraint Violation',
                type: 'Database Error',
            });
            return;
        }

    }

    if (err instanceof PrismaClientUnknownRequestError) {
        res.status(400).json({
            message: 'Bad Request',
            db_err_type: 'Please provide an valid input.',
            type: 'Database Error',
        });
        return;
    }

    if (err instanceof ZodError) {
        const zodError = fromZodError(err);
        res.status(422).json(zodError);
        return;
    }

    if (err instanceof InvalidPassword) {
        res.status(400).json({
            message: err.message,
            type: 'Client Error',
        });
        return;
    }

    if (err instanceof RefreshTokenError) {
        res.status(500).json({
            message: err.message,
            type: 'Internal server error.',
        });
        return;
    }

    if (err instanceof TokenExpiredError) {
        res.status(400).json({
            message: 'Session is expired.',
            type: 'Client error.',
        });
        return;
    }

    res.status(500).json({ message: 'Internal server error.' });

}

export default errorMiddleware;