import { z } from 'zod';
import { valCreateUser } from "~/validators/users/index.val";

type IUserCreateInput = z.infer<typeof valCreateUser>;

export {
    IUserCreateInput
}