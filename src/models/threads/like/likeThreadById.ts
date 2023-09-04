import { NextFunction } from "express";

interface ILikeThreadInput {
    user_id: string,
    thread_id: string
}

const likeThreadById = async (input: ILikeThreadInput, next: NextFunction) => {

    try {

        if (await hasDuplicate(input, next)) {
            return {
                thread_id: input.thread_id,
                message: 'You\'ve already liked this thread',
                type: 'DUPLICATE'
            }
        }

        return await prismaCli.thread_likes.create({
            select: {
                id: true,
                created_at: true,
                thread_id: true,
                by_user_id: true
            },
            data: {
                by_user_id: input.user_id,
                thread_id: input.thread_id
            }
        });

    } catch (error: unknown) {
        next(error);
    }
}

const hasDuplicate = async (input: ILikeThreadInput, next: NextFunction) => {
    try {
        const count = await prismaCli.thread_likes.count({
            where: {
                by_user_id: input.user_id,
                thread_id: input.thread_id
            }
        });

        return count >= 1;
    } catch (error: unknown) {
        next(error);
    }
}

export default likeThreadById;