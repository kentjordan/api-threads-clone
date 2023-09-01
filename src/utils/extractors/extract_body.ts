import { IRequestCustomBody } from "~/@types/request";

const extractBody = <B>(req: IRequestCustomBody<B>) => {
    return req.body;
}

export default extractBody;