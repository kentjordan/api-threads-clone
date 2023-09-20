import { z } from 'zod';

const valThreadId = z.object({
    thread_id: z.string().uuid()
}).strict();

const valcreateThreadInput = z.object({
    content_text: z.string().min(1),
    content_photos: z.array(z.string())
}).strict();

const valParamsUnlikeThread = z.object({
    thread_id: z.string().min(1),
    like_id: z.string().min(1)
}).strict()

const valUpdateThreadInput = z.object({
    content_text: z.string().min(1).optional(),
    content_photos: z.array(z.string()).optional()
}).strict();

export {
    valcreateThreadInput,
    valThreadId,
    valParamsUnlikeThread,
    valUpdateThreadInput
}