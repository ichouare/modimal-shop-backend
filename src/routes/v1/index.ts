import { Router } from 'express';

import AuthenticationRouter from './authentication.router';
import ProductsRouter from "./Products.routes"
import SwaggerRouter from "../../swagger"
const router = Router();

router.use('/auth', AuthenticationRouter);
router.use('/product', ProductsRouter);
router.use("/", SwaggerRouter)



export default router;
