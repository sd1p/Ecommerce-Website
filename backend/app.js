const express =require('express');
const app =express();
const errorMIddleware= require('./middleware/error')
app.use(express.json());

//Route Import
const product= require("./routes/productRoute");
const ErrorHandler = require('./utils/errorHandeler');
app.use('/api/v1',product)

//Middleware for errors

app.use(errorMIddleware)

module.exports =app;