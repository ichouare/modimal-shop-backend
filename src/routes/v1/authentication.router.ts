import { Router } from 'express';
import { User } from '../../modules/user.module';
import { sendError } from '../../services/helpers';
import refreshToken, {
    Auth0Register,
    loginAsUser,
    loginAsAdmin,
    RegisterUser,
    loggOut,
} from '../../controllers/v1/authenticatiin.contoller';
import { validate } from '../../middleware/validationHandler';
import { TSchema } from '../../types/register.schema';
import { LoginSchema } from '../../types/login.schema';

const router = Router();

router.post(
    '/user',
    validate({
        body: LoginSchema,
    }),
    loginAsUser
);

router.post(
    '/admin',
    validate({
        body: LoginSchema,
    }),
    loginAsAdmin
);

router.post(
    '/register',
    validate({
        body: TSchema,
    }),
    RegisterUser
);

router.post(
    '/auth0',
    validate({
        body: TSchema,
    }),
    Auth0Register
);

router.get('/logout', loggOut);

router.get('/refreshToken', refreshToken);

export default router;
