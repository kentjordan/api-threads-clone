import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { IRequestCustomBody, IRequestCustomParams, IRequestCustomQuery } from '~/@types/request';

const extractUserFromTokenOnHeader = <T>(req: IRequestCustomBody<T> | IRequestCustomParams<T> | IRequestCustomQuery<T>, type: 'refresh' | 'access') => {

    const token = req.get('Authorization')?.split(' ').at(1) as string;

    if (type === 'refresh') {

        const decodedRT = jwt.decode(token) as {
            access_token: string,
            iat: number,
            exp: number
        };

        const decodedAT = jwt.decode(decodedRT.access_token) as {
            id: string,
            iat: number,
            exp: number
        };

        return { id: decodedAT.id, token }

    }

    if (type === 'access') {
        const decodedAT = jwt.decode(token) as {
            id: string,
            iat: number,
            exp: number
        };

        return { id: decodedAT.id, token }

    }

    return { id: null, token };
}

export default extractUserFromTokenOnHeader;