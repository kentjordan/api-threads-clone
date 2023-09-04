import { IRequestCustomParams } from "~/@types/request";

const extractReqParams = <P>(req: IRequestCustomParams<P>) => {
    return req.params;
}

export default extractReqParams;