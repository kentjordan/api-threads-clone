import { z } from 'zod';

const valCreateUser = z.object({
    email: z.string().email(),
    password: z.string(),
    first_name: z.string(),
    last_name: z.string(),
}).strict();

export {
    valCreateUser
}