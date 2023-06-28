import {expect} from "chai";
import { dropCarts, dropProducts, dropTickets } from "../test.setup.js";
import { requester } from "../test.setup.js";

describe('Carts routes test cases', ()=>{
   afterEach(async()=>{
        await dropCarts();
        await dropProducts();
    }); 
    after(async()=>{
        await dropTickets();
    }); 

   it('[GET] /api/carts - Should get an empty carts array', async ()=>{
        const response = await requester.get('/api/carts');
        expect(response.statusCode).to.be.eql(200);
        expect(response.body.payload.length).to.be.eql(0);
    })

    it('[POST] /api/carts - Should create a single cart successfully', async ()=>{
        const response = await requester.post('/api/carts');
        expect(response.statusCode).to.be.eql(201);
        expect(response.body.payload._id).to.exist;
    })

    it('[GET] /api/carts/:cid - Should get a single cart', async ()=>{
        const mockCart = {
            products:[]
        }
        const post = await requester.post('/api/carts').send(mockCart);
        expect(post.statusCode).to.be.eql(201);
        const cart = post.body.payload; 
        const response = await requester.get(`/api/carts/${cart._id}`);
        expect(response.statusCode).to.be.eql(200);
        expect(response.body.payload._id).to.exist;

    })   

    it('[POST] /api/carts/:cid/product/:pid - Should add a specified product to a specified cart successfully', async ()=>{
        const mockProduct = {
            title: 'Sombrero',
            description: 'Blanco con rayas negras',
            price: 360,
            category: 'Accesorios',
            code: 'campeondelmundo123',
            stock: 30,
        }
        const prodPost = await requester.post('/api/products').send(mockProduct);
        const product = prodPost.body.payload;
        const mockCart = {
            products:[]
        }
        const cartPost = await requester.post('/api/carts').send(mockCart);
        const cart = cartPost.body.payload;        
        const addProd = await requester.post(`/api/carts/${cart._id}/product/${product._id}`);
        expect(addProd.statusCode).to.be.eql(200);
        const get = await requester.get('/api/carts');
        expect(get.body.payload[0]._id).to.exist;
        expect(get.body.payload[0].products.length).to.be.eql(1); 
        

    }) 

    it('[POST] /api/carts/:cid/purchase - Should purchase a specified cart successfully', async ()=>{
        const mockProduct = {
            title: 'Sombrero',
            description: 'Blanco con rayas negras',
            price: 360,
            category: 'Accesorios',
            code: 'campeondelmundo123',
            stock: 30,
        }
        const prodPost = await requester.post('/api/products').send(mockProduct);
        const product = prodPost.body.payload;
        expect(prodPost.statusCode).to.be.eql(201);
        expect(product._id).to.exist;       
        const mockCart = {
            products:[]
        }
        const cartPost = await requester.post('/api/carts').send(mockCart);
        const cart = cartPost.body.payload;
        expect(cartPost.statusCode).to.be.eql(201);
        expect(cart._id).to.exist;
        await requester.post(`/api/carts/${cart._id}/product/${product._id}`);
        const response = await requester.post(`/api/carts/${cart._id}/purchase`);
        expect(cartPost.statusCode).to.be.eql(201);
        expect(response.body.payload._id).to.exist;
        

    })

    it('[PUT] /api/carts/:cid/clean - Should clean a specified cart successfully', async ()=>{
        const mockProduct = {
            title: 'Sombrero',
            description: 'Blanco con rayas negras',
            price: 360,
            category: 'Accesorios',
            code: 'campeondelmundo123',
            stock: 30,
        }
        const prodPost = await requester.post('/api/products').send(mockProduct);
        const product = prodPost.body.payload;
        expect(prodPost.statusCode).to.be.eql(201);
        expect(product._id).to.exist;       
        const mockCart = {
            products:[]
        }
        const cartPost = await requester.post('/api/carts').send(mockCart);
        const cart = cartPost.body.payload;
        expect(cartPost.statusCode).to.be.eql(201);
        expect(cart._id).to.exist;
        const addProd = await requester.post(`/api/carts/${cart._id}/product/${product._id}`);
        expect(addProd.statusCode).to.be.eql(200);
        await requester.put(`/api/carts/${cart._id}/clean`);
        const get = await requester.get('/api/carts');
        expect(get.body.payload[0].products.length).to.be.eql(0); 
      

    })

    it('[DELETE] /api/carts/:cid/product/:pid - Should delete a specified product from a specified cart successfully', async ()=>{
        const mockProduct = {
            title: 'Sombrero',
            description: 'Blanco con rayas negras',
            price: 360,
            category: 'Accesorios',
            code: 'campeondelmundo123',
            stock: 30,
        }
        const prodPost = await requester.post('/api/products').send(mockProduct);
        const product = prodPost.body.payload;
        expect(prodPost.statusCode).to.be.eql(201);
        expect(product._id).to.exist;       
        const mockCart = {
            products:[]
        }
        const cartPost = await requester.post('/api/carts').send(mockCart);
        const cart = cartPost.body.payload;
        expect(cartPost.statusCode).to.be.eql(201);
        expect(cart._id).to.exist;
        const addProd = await requester.post(`/api/carts/${cart._id}/product/${product._id}`);
        expect(addProd.statusCode).to.be.eql(200);
        await requester.delete(`/api/carts/${cart._id}/product/${product._id}`);
        const get = await requester.get('/api/carts');
        expect(get.body.payload[0].products.length).to.be.eql(0); 
      

    })

    it('[DELETE] /api/carts - Should delete a single cart successfully', async ()=>{
        const mockCart = {
            products:[]
        }
        const post = await requester.post('/api/carts').send(mockCart);
        const cart = post.body.payload;
        expect(post.statusCode).to.be.eql(201);
        expect(post.body.payload._id).to.exist;
        const response = await requester.delete(`/api/carts/${cart._id}`);
        expect(response.statusCode).to.be.eql(200);
        const get = await requester.get('/api/carts');
        expect(get.body.payload.length).to.be.eql(0);
        
    }) 

})