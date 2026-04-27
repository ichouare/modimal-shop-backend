import { Router } from 'express';

import AuthenticationRouter from './authentication.router';
import ProductsRouter from "./Products.routes"
const router = Router();

router.use('/auth', AuthenticationRouter);
router.use('/product', ProductsRouter);



export default router;
