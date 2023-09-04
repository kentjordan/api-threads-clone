import { NextFunction } from "express";

const getThreadsByUserId = async (user_id: string, next: NextFunction) => {
    try {

        return await prismaCli.threads.findMany({
            select: {
                content_photos: true,
                content_text: true,
                created_at: true,
                id: true,
                updated_at: true,
                user_id: true
            },
            where: {
                user_id
            }
        });

    } catch (error: unknown) {
        next(error);
    }
}

export default getThreadsByUserId;