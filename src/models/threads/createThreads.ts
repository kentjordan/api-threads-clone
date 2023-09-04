import { NextFunction } from "express";
import { IThreadCreateInput } from "~/@types/threads";

const createThreads = async (input: IThreadCreateInput & { user_id: string }, next: NextFunction) => {

    try {
        return await prismaCli.threads.create({
            select: {
                id: true,
                user_id: true
            },
            data: {
                content_photos: input.content_photos,
                content_text: input.content_text,
                user_id: input.user_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }

}

export default createThreads;