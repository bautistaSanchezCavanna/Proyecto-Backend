const express = require('express');
const app = express();
const PORT = 8080;
const apiRoutes = require('./src/routers/app.routers');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRoutes);

app.listen(PORT, ()=>{}); 

