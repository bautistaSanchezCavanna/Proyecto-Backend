import {expect} from "chai";
import { dropCarts, dropUsers } from "../test.setup.js";
import { requester } from "../test.setup.js";

describe('Users routes test cases', ()=>{
     
 
    it('[GET] /api/users - Should get an empty users array', async ()=>{
        const response = await requester.get('/api/users');
        expect(response.statusCode).to.be.eql(200);
        expect(response.body.payload.length).to.be.eql(0);
       
    })

    it('[POST] /api/sessions/register - Should create a single user successfully', async ()=>{
        const mockUser = {
            first_name: 'Lionel',
            last_name: 'Messi',
            age: 36,
            email: 'messi@gmail.com',
            password: 'campeondelmundo',
        }
        const response = await requester.post('/api/sessions/register').send(mockUser);
        expect(response.statusCode).to.be.eql(201);
        expect(response.body.payload._id).to.exist;
        await dropUsers();
        await dropCarts();
    })

    it('[GET] /api/users/:uid - Should get a single user', async ()=>{
        const mockUser = {
            first_name: 'Lionel',
            last_name: 'Messi',
            age: 36,
            email: 'messi@gmail.com',
            password: 'campeondelmundo',
        }
        const post = await requester.post('/api/sessions/register').send(mockUser);
        const user = post.body.payload;
        expect(post.statusCode).to.be.eql(201);
        const response = await requester.get(`/api/users/${user._id}`);
        expect(response.statusCode).to.be.eql(200);
        expect(response.body.payload._id).to.exist;
        await dropUsers();
        await dropCarts();
    }) 

    it('[PUT] /api/users/:uid - Should update a single user successfully', async ()=>{
        const mockUser = {
            first_name: 'Lionel',
            last_name: 'Messi',
            age: 36,
            email: 'messi@gmail.com',
            password: 'campeondelmundo',
        }
        const post = await requester.post('/api/sessions/register').send(mockUser);
        const user = post.body.payload;
        expect(post.statusCode).to.be.eql(201);
        const updates = {
            role: "ADMIN"
        }
        const response = await requester.put(`/api/users/${user._id}`).send(updates);
        expect(response.statusCode).to.be.eql(200);
        expect(response.body.payload.role).to.be.eql(updates.role);
        expect(response.body.payload._id).to.be.eql(user._id);
        await dropUsers();
        await dropCarts();
    })

    it('[DELETE] /api/users/:uid - Should delete a single user', async ()=>{
        const mockUser = {
            first_name: 'Lionel',
            last_name: 'Messi',
            age: 36,
            email: 'messi@gmail.com',
            password: 'campeondelmundo',
        }
        const post = await requester.post('/api/sessions/register').send(mockUser);
        const user = post.body.payload;
        expect(post.statusCode).to.be.eql(201);
        const get = await requester.get('/api/users');
        expect(get.body.payload.length).to.be.eql(1); 
        const response = await requester.delete(`/api/users/${user._id}`);
        expect(response.statusCode).to.be.eql(200);
        expect(response.body.payload._id).to.be.eql(user._id);
        const getCheck = await requester.get('/api/users');
        expect(getCheck.body.payload.length).to.be.eql(0); 
        await dropUsers();
        await dropCarts();
    }) 

}) 