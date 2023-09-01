import { z } from 'zod';
import { valProcessEnv } from "~/validators/global.val";
import { PrismaClient } from '@prisma/client';

declare global {

    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof valProcessEnv> { }
    }

    namespace Express {
        interface User {
            id: string
        }
    }

    var frontend: {
        urls: Array<string>
    }

    var prismaCli: PrismaClient

}