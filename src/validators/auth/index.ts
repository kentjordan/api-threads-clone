import { z } from 'zod';

const valLogin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
}).strict();

const valRefresh = z.object({
    refresh_token: z.string()
}).strict();

export {
    valLogin,
    valRefresh
}