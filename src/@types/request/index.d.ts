import { Request } from "express";

type IRequestCustomBody<B> = Request<any, any, B, any>;
type IRequestCustomParams<P> = Request<P, any, any, any>;
type IRequestCustomQuery<Q> = Request<any, any, any, Q>;

export {
    IRequestCustomBody,
    IRequestCustomParams,
    IRequestCustomQuery
}