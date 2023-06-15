import { Router } from "express";
const router = Router();

import FSproductRoutes from './products/FSproductos.routes.js';
import FScartRoutes from './carts/FScarts.routes.js';
import fileRoutes from './files/files.routes.js';

import ProductsRouter from './products/products.routes.js';
import CartsRouter  from './carts/carts.routes.js';
import sessionsRoutes from './sessions/sessions.routes.js';
import UsersRouter from './users/users.routes.js';

router.use('/FSproducts', FSproductRoutes);
router.use('/FScarts', FScartRoutes);
router.use('/files', fileRoutes);

router.use('/products', ProductsRouter.getRouter());
router.use('/carts', CartsRouter.getRouter());
router.use('/users', UsersRouter.getRouter());
router.use('/sessions', sessionsRoutes);



export default router;