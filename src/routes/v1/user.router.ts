import Router from 'express'
import {
  currentUser,
  restPassword,
} from '../../controllers/v1/user.controller'
import { authenticationHandler } from '../../middleware/authenticationHandler'
import { validate } from '../../middleware/validationHandler'
import { ResetPasswordSchema } from '../../types/resetPassoword.schema'

const router = Router()

router.get('/me', authenticationHandler, currentUser)
router.post(
  '/reset-password',
  authenticationHandler,
  validate({ body: ResetPasswordSchema }),
  restPassword
)

export default router
