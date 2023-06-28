import {expect} from "chai";
import { dropProducts } from "../test.setup.js";
import { requester } from "../test.setup.js";

describe('Products routes test cases', ()=>{

    it('[GET] /api/products - Should get an empty products array', async ()=>{
        const response = await requester.get('/api/products');
        expect(response.statusCode).to.be.eql(200);
        expect(response.body.payload.length).to.be.eql(0);

    })

    it('[POST] /api/products - Should create a single product successfully', async ()=>{
        const mockProduct = {
            title: 'Sombrero',
            description: 'Blanco con rayas negras',
            price: 360,
            category: 'Accesorios',
            code: 'campeondelmundo123',
            stock: 30,
        }
        const response = await requester.post('/api/products').send(mockProduct);
        expect(response.statusCode).to.be.eql(201);
        expect(response.body.payload._id).to.exist;

    })

    it('[GET] /api/products/:pid - Should get a single product', async ()=>{
        await dropProducts();

        const mockProduct = {
            title: 'Sombrero',
            description: 'Blanco con rayas negras',
            price: 360,
            category: 'Accesorios',
            code: 'campeondelmundo123',
            stock: 30,
        }
        const post = await requester.post('/api/products').send(mockProduct);
        const product = post.body.payload;
        expect(post.statusCode).to.be.eql(201);
        const response = await requester.get(`/api/products/${product._id}`);
        expect(response.statusCode).to.be.eql(200);
        expect(response.body.payload._id).to.exist;

    }) 

    it('[PUT] /api/products/:pid - Should update a single product successfully', async ()=>{
        await dropProducts();

        const mockProduct = {
            title: 'Sombrero',
            description: 'Blanco con rayas negras',
            price: 360,
            category: 'Accesorios',
            code: 'campeondelmundo123',
            stock: 30,
        }
        const post = await requester.post('/api/products').send(mockProduct);
        const product = post.body.payload;
        expect(post.statusCode).to.be.eql(201);
        const updates = {
            price: 1500,
            stock: 22
        }
        const response = await requester.put(`/api/products/${product._id}`).send(updates);
        expect(response.statusCode).to.be.eql(200);
        expect(response.body.payload.price).to.be.eql(updates.price);
        expect(response.body.payload.stock).to.be.eql(updates.stock);
        expect(response.body.payload._id).to.be.eql(product._id);

    })

    it('[DELETE] /api/products/:pid - Should delete a single product', async ()=>{
        await dropProducts();

        const mockProduct = {
            title: 'Sombrero',
            description: 'Blanco con rayas negras',
            price: 360,
            category: 'Accesorios',
            code: 'campeondelmundo123',
            stock: 30,
        }
        const post = await requester.post('/api/products').send(mockProduct);
        const product = post.body.payload;
        expect(post.statusCode).to.be.eql(201);
        const get = await requester.get('/api/products');
        expect(get.body.payload.length).to.be.eql(1); 
        const response = await requester.delete(`/api/products/${product._id}`);
        expect(response.statusCode).to.be.eql(200);
        expect(response.body.payload._id).to.be.eql(product._id);
        const getCheck = await requester.get('/api/products');
        expect(getCheck.body.payload.length).to.be.eql(0); 

    }) 

})