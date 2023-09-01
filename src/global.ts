import { z } from 'zod';
import { valProcessEnv } from "./validators/global.val";

declare global {

    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof valProcessEnv> { }
    }

    var frontend: {
        urls: Array<string>
    }

}