const { Router } = require("express");
const router = Router();
const productRoutes = require('./products/products.routes');
const cartRoutes = require('./carts/carts.routes');
const fileRoutes = require('./files/files.routes');
const viewsRoutes = require('./vistas/views.routes')

router.use('/products', productRoutes);
router.use('/carts', cartRoutes);
router.use('/files', fileRoutes);
router.use('/views', viewsRoutes)


module.exports = router;