import { Router } from "express";
import * as UsersService from './users.service';
import validateBody from "~/middlewares/validators/validateBody";
import * as UsersValidator from '~/validators/users/index.val';
import { IUserCreateInput } from "~/@types/models/users";

const router = Router();

router.post('/',
    validateBody<IUserCreateInput>(UsersValidator.valCreateUser),
    UsersService.createUser
);

export default router;