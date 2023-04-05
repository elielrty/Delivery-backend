import { ensureAuthenticated } from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import { CreateRoleController } from '@modules/user/services/Role/CreateRole/CreateRoleController';
import { DeleteUserController } from '@modules/user/services/User/DeleteUser/DeleteUserController';
import { FindUserByIdController } from '@modules/user/services/User/FindUserById/FindUserByIdController';
import { UpdateUserController } from '@modules/user/services/User/UpdateUser/UpdateUserController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const rolesRouter = Router();

rolesRouter.use(ensureAuthenticated);

const createRoleController = new CreateRoleController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const findUserByIdController = new FindUserByIdController();

rolesRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        role: Joi.string().required(),
      },
    },
    { abortEarly: false },
  ),
  createRoleController.handle,
);

rolesRouter.put(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        role: Joi.string().required(),
      },
    },
    { abortEarly: false },
  ),
  updateUserController.handle,
);

rolesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteUserController.handle,
);

// rolesRouter.get('/me', ensureAuthenticated, findUserByIdController.handle);

export { rolesRouter };
