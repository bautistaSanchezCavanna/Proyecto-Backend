import { Router } from "express";
const router = Router();

import FSproductRoutes from './products/FSproductos.routes.js';
import FScartRoutes from './carts/FScarts.routes.js';
import fileRoutes from './files/files.routes.js';

import productsRoutes from './products/products.routes.js';
import cartsRoutes from './carts/carts.routes.js';
import sessionsRoutes from './sessions/sessions.routes.js';
import UsersRoutes from './users/users.routes.js';

router.use('/FSproducts', FSproductRoutes);
router.use('/FScarts', FScartRoutes);
router.use('/files', fileRoutes);

router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/users', UsersRoutes.getRouter());


export default router;