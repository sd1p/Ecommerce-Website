const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMIddleware = require("./middleware/error");
app.use(express.json());
app.use(cookieParser());

//Route Import
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const ErrorHandler = require("./utils/errorHandeler");
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);

//Middleware for errors

app.use(errorMIddleware);

module.exports = app;
