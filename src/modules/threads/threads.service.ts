import { Request, Response, NextFunction } from 'express';
import { IRequestCustomParams } from '~/@types/request';
import { IThreadCreateInput, IThreadId, IThreadUnlikePrams } from '~/@types/threads';
import * as ThreadModels from '~/models/threads'
import extractReqParams from '~/utils/extractors/extractReqParams';
import extractUserFromTokenOnHeader from '~/utils/extractors/extractUserFromTokenOnHeader';
import extractBody from '~/utils/extractors/extract_body';

const createThreads = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = extractUserFromTokenOnHeader(req, "access");
    const input = extractBody<IThreadCreateInput>(req);

    const createdThread = await ThreadModels.createThreads({
        ...input,
        user_id: id as string
    }, next);

    if (createdThread) {
        res.status(201).json({
            ...createThreads
        });
    }
}

const getThreadsByUserId = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = extractUserFromTokenOnHeader(req, "access");

    const userThreads = await ThreadModels.getThreadsByUserId(id as string, next);

    if (userThreads) {
        res.status(200).json([...userThreads]);
    }

}

const getThreadStatsById = async (req: IRequestCustomParams<IThreadId>, res: Response, next: NextFunction) => {

    const { thread_id } = extractReqParams<IThreadId>(req);

    const threadStats = await ThreadModels.getThreadStatsById(thread_id, next);

    if (threadStats) {
        res.status(200).json({
            thread_id,
            ...threadStats
        });
    }
}

const likeThreadById = async (req: IRequestCustomParams<IThreadId>, res: Response, next: NextFunction) => {

    const { thread_id } = extractReqParams<IThreadId>(req);

    const { id: user_id } = extractUserFromTokenOnHeader(req, "access");

    const likedThread = await ThreadModels.likeThreadById({
        thread_id,
        user_id: user_id as string
    }, next);

    if (likedThread) {
        res.status(200).json({
            ...likedThread
        });
    }
}

const unlikeThreadById = async (req: IRequestCustomParams<IThreadUnlikePrams>, res: Response, next: NextFunction) => {

    const { like_id, thread_id } = extractReqParams<IThreadUnlikePrams>(req);

    const { id: user_id } = extractUserFromTokenOnHeader(req, "access");

    const likedThread = await ThreadModels.unlikeThreadById({
        thread_id,
        like_id,
        user_id: user_id as string
    }, next);

    if (likedThread) {
        res.status(200).json({
            ...likedThread
        })
    }
}

const updateThreadsById = async (req: Request, res: Response, next: NextFunction) => {
}

const deleteThreadsById = async (req: Request, res: Response, next: NextFunction) => {
}

export {
    createThreads,
    deleteThreadsById,
    updateThreadsById,
    likeThreadById,
    unlikeThreadById,
    getThreadsByUserId,
    getThreadStatsById
}