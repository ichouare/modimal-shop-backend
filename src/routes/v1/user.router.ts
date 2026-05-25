import Router from 'express'
import {
  currentUser,
  resetPassword,
} from '../../controllers/v1/user.controller'
import { authenticationHandler } from '../../middleware/authenticationHandler'
import { validate } from '../../middleware/validationHandler'
import { ResetPasswordSchema } from '../../types/resetPassword.schema'

const router = Router()

router.get('/me', authenticationHandler, currentUser)
router.post(
  '/reset-password',
  authenticationHandler,
  validate({ body: ResetPasswordSchema }),
  resetPassword
)

export default router
