import { NextFunction } from "express";

interface IUnlikeThread {
    thread_id: string,
    user_id: string,
    like_id: string
}

const unlikeThreadById = async (input: IUnlikeThread, next: NextFunction) => {
    try {
        return await prismaCli.thread_likes.delete({
            select: {
                id: true,
                thread_id: true,
                by_user_id: true
            },
            where: {
                id: input.like_id,
                thread_id: input.thread_id,
                by_user_id: input.user_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default unlikeThreadById;