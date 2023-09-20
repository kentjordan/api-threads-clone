import { NextFunction } from "express";
import { IThreadUpdateInput } from "~/@types/threads";

const updateThreadsById = async (thread_id: string, updateInput: IThreadUpdateInput, next: NextFunction) => {
    try {
        return await prismaCli.threads.update({
            where: {
                id: thread_id
            },
            data: {
                ...updateInput,
                updated_at: new Date().toISOString()
            }
        })
    } catch (error: unknown) {
        next(error);
    }
}

export default updateThreadsById;