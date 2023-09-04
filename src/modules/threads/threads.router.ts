import { Router } from "express";
import * as ThreadsService from './threads.service';
import * as ThreadValidator from '~/validators/threads'
import passport from '~/middlewares/passport';
import validateBody from "~/middlewares/validators/validateBody";
import { IThreadCreateInput } from "~/@types/threads";

const router = Router();

router.post('/',
    validateBody<IThreadCreateInput>(ThreadValidator.valcreateThreadInput),
    passport.authenticate('jwt-auth', { session: false }),
    ThreadsService.createThreads
);

// Get the stats of the specified threads 
router.get('/:thread_id/stats',
    passport.authenticate('jwt-auth', { session: false }),
    ThreadsService.getThreadStatsById
);

// UPDATE thread content: text and photo
router.put('/:id',
    passport.authenticate('jwt-auth', { session: false }),
    // ThreadsService.updateThreadsById
);

// POST to threads_like table 
router.post('/:thread_id/like',
    passport.authenticate('jwt-auth', { session: false }),
    ThreadsService.likeThreadById
);

router.delete('/:thread_id/like/:like_id',
    passport.authenticate('jwt-auth', { session: false }),
    ThreadsService.unlikeThreadById
);

// POST to threads_repost table
router.post('/:id/repost',
    passport.authenticate('jwt-auth', { session: false }),
    // ThreadsService.updateThreadsById
);

router.delete('/:id',
    passport.authenticate('jwt-auth', { session: false }),
    // ThreadsService.deleteThreadsById
);

// User's threads
router.get('/user/:id',
    passport.authenticate('jwt-auth', { session: false }),
    ThreadsService.getThreadsByUserId
);


export default router;