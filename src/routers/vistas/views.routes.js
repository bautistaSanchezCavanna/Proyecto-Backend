const {Router} = require('express');
const router = Router();
const ProductManager = require("../../daos/fsManagers/productManager");
const fsPManager = new ProductManager("./src/data/products.json");
const PManager = require('../../daos/mongoManagers/products.manager.js');
const productService = new PManager();
const CManager = require('../../daos/mongoManagers/carts.manager.js');
const cartService = new CManager();


const fileProcess = ()=>{
    try {
        router.get('/home', async (req, res)=>{
            const products = await fsPManager.getProducts();
            console.log(products);
            const data = {
                title: 'Home',
                info: products
            }
            res.render('home', data);
        })
 
        router.get('/realTimeProducts', async (req, res) =>{
            const products = await fsPManager.getProducts();
            const data = {
                title: 'Real Time Products',
                info: products,
                style: '/styles/realTimeProducts.css'
            }
            res.render('realTimeProducts', data);
        })

        router.get('/products', async (req, res)=>{
            const products = await productService.getProducts();
            const data = {
                title: 'Products',
                info: products
            };
            res.render('products', data);
        })

        router.get('/carts/:cid', async (req, res)=>{
            const cid = req.params.cid;
            const cart = await cartService.getCartById(cid)
            const data = {
                title: 'Carrito',
                info: cart.products,
                cid: cid
            }
            
            res.render('carts', data)
        })
    } catch (error) {
        throw new Error(error.message);
    }
}

fileProcess();

module.exports = router;