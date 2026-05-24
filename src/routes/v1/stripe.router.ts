import { Router } from 'express'
import { authenticationHandler } from '../../middleware/authenticationHandler'
import {
  createCheckoutSession,
  updateOrderStatus,
} from '../../controllers/v1/stripe.controller'

const router = Router()

router.post(
  '/create-checkout-session',
  authenticationHandler,
  createCheckoutSession
)
router.post('/order-status', authenticationHandler, updateOrderStatus)

export default router
