
import { z } from 'zod';
import { valParamsUnlikeThread, valThreadId, valcreateThreadInput } from '~/validators/threads';

type IThreadCreateInput = z.infer<typeof valcreateThreadInput>;
type IThreadId = z.infer<typeof valThreadId>
type IThreadUnlikePrams = z.infer<typeof valParamsUnlikeThread>

export {
    IThreadCreateInput,
    IThreadId,
    IThreadUnlikePrams
}
