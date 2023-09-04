import { NextFunction } from "express";

const getThreadStatsById = async (thread_id: string, next: NextFunction) => {

    try {

        // Get likes count
        const likes_count = await prismaCli.thread_likes.count({
            where: {
                thread_id
            }
        });

        // Get replies count
        const replies_count = await prismaCli.thread_replies.count({
            where: {
                thread_id
            }
        });

        return {
            likes_count,
            replies_count
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default getThreadStatsById;