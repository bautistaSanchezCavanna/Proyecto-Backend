const express = require('express');
const { Server } = require('socket.io');
const app = express();
const PORT = 8080;
const apiRoutes = require('./src/routers/app.routers');
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRoutes);
app.use(express.static(__dirname + '/public'));

const httpServer = app.listen(PORT, ()=>{}); 

const socketServer = new Server(httpServer);
socketServer.on('connection', (socket)=>{
    console.log('nuevo cliente conectado');
    console.log(socket);
})