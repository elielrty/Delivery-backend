// import { upload } from '@config/upload';
import { ensureAuthenticated } from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import { CreateUserController } from '@modules/user/services/User/CreateUser/CreateUserController';
import { DeleteUserController } from '@modules/user/services/User/DeleteUser/DeleteUserController';
import { FindUserByIdController } from '@modules/user/services/User/FindUserById/FindUserByIdController';
import { UpdateUserController } from '@modules/user/services/User/UpdateUser/UpdateUserController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
// import multer from 'multer';

const usersRouter = Router();

// const Upload = multer(upload.multer);

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const findUserByIdController = new FindUserByIdController();

usersRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        isAdmin: Joi.boolean(),
      },
    },
    { abortEarly: false },
  ),
  createUserController.handle,
);

usersRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        isAdmin: Joi.boolean().required(),
      },
    },
    { abortEarly: false },
  ),
  updateUserController.handle,
);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  deleteUserController.handle,
);

usersRouter.get('/me', ensureAuthenticated, findUserByIdController.handle);

export { usersRouter };
