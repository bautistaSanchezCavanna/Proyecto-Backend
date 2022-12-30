const { Router } = require("express");
const router = Router();
const productRoutes = require('./products/products.routes');
const cartRoutes = require('./carts/carts.routes');


router.use('/products', productRoutes);
router.use('/carts', cartRoutes);



module.exports = router;