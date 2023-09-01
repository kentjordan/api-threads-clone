import { z } from 'zod';

const valLogin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
}).strict();

export {
    valLogin
}