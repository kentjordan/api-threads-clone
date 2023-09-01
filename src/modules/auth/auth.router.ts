import { Router } from "express";
import * as AuthService from './auth.service';
import validateBody from "~/middlewares/validators/validateBody";
import { IAuthLoginInput } from "~/@types/models/auth";
import * as AuthValidators from "~/validators/auth";

const router = Router();

router.post('/login',
    validateBody<IAuthLoginInput>(AuthValidators.valLogin),
    AuthService.login
);

export default router;