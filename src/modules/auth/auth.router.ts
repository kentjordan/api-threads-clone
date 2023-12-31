import { Router } from "express";
import * as AuthService from './auth.service';
import validateBody from "~/middlewares/validators/validateBody";
import { IAuthLoginInput, IAuthRefreshInput } from "~/@types/models/auth";
import * as AuthValidators from "~/validators/auth";
import passport from '~/middlewares/passport';

const router = Router();

router.post('/login',
    validateBody<IAuthLoginInput>(AuthValidators.valLogin),
    AuthService.login
);

router.get('/refresh-token',
    passport.authenticate('jwt-auth', { session: false }),
    AuthService.refreshTokens
);

export default router;