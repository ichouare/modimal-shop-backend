import { Router } from 'express'
import refreshToken, {
  Auth0Register,
  loggOut,
  loginAsAdmin,
  loginAsUser,
  RegisterUser,
} from '../../controllers/v1/authentication.contoller'
import { validate } from '../../middleware/validationHandler'
import { LoginSchema } from '../../types/login.schema'
import { TSchema } from '../../types/register.schema'

const router = Router()

router.post(
  '/user',
  validate({
    body: LoginSchema,
  }),
  loginAsUser
)

router.post(
  '/admin',
  validate({
    body: LoginSchema,
  }),
  loginAsAdmin
)

router.post(
  '/register',
  validate({
    body: TSchema,
  }),
  RegisterUser
)

router.post(
  '/auth0',
  validate({
    body: TSchema,
  }),
  Auth0Register
)

router.get('/logout', loggOut)

router.get('/refreshToken', refreshToken)

export default router
