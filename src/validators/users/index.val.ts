import { z } from 'zod';

const valCreateUser = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    first_name: z.string().min(2),
    last_name: z.string().min(2),
}).strict();

export {
    valCreateUser
}