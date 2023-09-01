import { NextFunction, Request, Response } from "express";

const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: 'Internal server error.' });
}

export default errorMiddleware;