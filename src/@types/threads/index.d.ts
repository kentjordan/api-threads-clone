
import { z } from 'zod';
import { valParamsUnlikeThread, valThreadId, valUpdateThreadInput, valcreateThreadInput } from '~/validators/threads';

type IThreadCreateInput = z.infer<typeof valcreateThreadInput>;
type IThreadId = z.infer<typeof valThreadId>
type IThreadUnlikePrams = z.infer<typeof valParamsUnlikeThread>
type IThreadUpdateInput = z.infer<typeof valUpdateThreadInput>;

export {
    IThreadCreateInput,
    IThreadId,
    IThreadUnlikePrams,
    IThreadUpdateInput
}
