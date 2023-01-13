const {Router} = require('express');
const router = Router();
const ProductManager = require("../../manager/productManager");
const pManager = new ProductManager("./src/data/products.json");

const fileProcess = ()=>{
    try {
        router.get('/home', async (req, res)=>{
            const products = await pManager.getProducts();
            const data = {
                title: 'Mi página',
                info: products
            }
            res.render('home', data);
        })
 
    } catch (error) {
        throw new Error(error.message);
    }
}

fileProcess();

module.exports = router;