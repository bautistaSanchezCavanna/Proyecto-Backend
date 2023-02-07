const {Router} = require('express');
const router = Router();
const ProductManager = require("../../daos/fsManagers/productManager");
const pManager = new ProductManager("./src/data/products.json");

const fileProcess = ()=>{
    try {
        router.get('/home', async (req, res)=>{
            const products = await pManager.getProducts();
            const data = {
                title: 'Home',
                info: products
            }
            res.render('home', data);
        })
 
        router.get('/realTimeProducts', async (req, res) =>{
            const products = await pManager.getProducts();
            const data = {
                title: 'Real Time Products',
                info: products,
                style: '/styles/realTimeProducts.css'
            }
            res.render('realTimeProducts', data);
        })
    } catch (error) {
        throw new Error(error.message);
    }
}

fileProcess();

module.exports = router;