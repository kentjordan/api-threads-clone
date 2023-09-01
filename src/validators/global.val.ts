import { z } from 'zod';

const valProcessEnv = z.object({
    API_HOSTNAME: z.string(),
    API_PORT: z.string(),
    SECRET_KEY: z.string(),
}).strict();

export {
    valProcessEnv
}