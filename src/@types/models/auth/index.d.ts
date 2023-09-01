import { z } from 'zod';
import { valLogin } from "~/validators/auth";

type IAuthLoginInput = z.infer<typeof valLogin>;

export {
    IAuthLoginInput
}