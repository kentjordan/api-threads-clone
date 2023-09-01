import { Request } from 'express';

const extractUser = (req: Request) => {
    return req.user as Express.User;
}

export default extractUser;