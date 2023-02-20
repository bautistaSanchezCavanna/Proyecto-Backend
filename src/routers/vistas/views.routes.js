const {Router} = require('express');
const router = Router();
const ProductManager = require("../../daos/fsManagers/productManager");
const fsPManager = new ProductManager("./src/data/products.json");
const PManager = require('../../daos/mongoManagers/products.manager.js');
const productService = new PManager();
const CManager = require('../../daos/mongoManagers/carts.manager.js');
const cartService = new CManager();
const MongoStore = require('connect-mongo');

const path = require('path');

const session = require('express-session');

router.use(session({
    name:'session1',
    secret:'elefante',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://bsanchezcavanna:lJkVJFQEsEcyKtOh@codercluster.sukhsuw.mongodb.net/dataSessions?retryWrites=true&w=majority'
    })
  }))

const fileProcess = ()=>{
    try {
        router.get('/home', async (req, res)=>{
            const products = await fsPManager.getProducts();
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
            const email = req.session?.user;
            const products = await productService.getProducts();
            const data = {
                title: 'Products',
                info: products,
                user: email
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

        router.get('/login', async (req, res)=>{
            res.render('login');
            let {email, password} = req.query;
            //req.session.isAdmin = email.split('@')[1].includes('admin') ?? false;
            req.session.user = email;
            if(email === 'pepe@email.com'){
                res.redirect('/products');
            }
        })
        
        router.get('/logout', async (req, res)=>{
            req.session.destroy(err=>{
                if(!err){
                    const html = '<h1>Logout successfull</h1><a href="/login">LogIn again</a>'
                    res.send(html);
                }else{
                    res.send("ERROR:", err);
                }
            })
        })
    } catch (error) {
        throw new Error(error.message);
    }
}

fileProcess();

module.exports = router;