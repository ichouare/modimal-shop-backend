import { Router } from 'express'

import AuthenticationRouter from './authentication.router'
import ProductsRouter from './Products.routes'
import UserRouter from './user.router'
import StripeRouter from './stripe.router'
import SwaggerRouter from '../../swagger'
const router = Router()

router.use('/auth', AuthenticationRouter)
router.use('/user', UserRouter)
router.use('/product', ProductsRouter)
router.use('/stripe', StripeRouter)
router.use('/', SwaggerRouter)

export default router
