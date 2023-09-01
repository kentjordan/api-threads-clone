import { z } from 'zod';
import { valLogin, valRefresh } from "~/validators/auth";

type IAuthLoginInput = z.infer<typeof valLogin>;
type IAuthRefreshInput = z.infer<typeof valRefresh>;

export {
    IAuthLoginInput,
    IAuthRefreshInput
}