const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMIddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

//Route Import
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const ErrorHandler = require("./utils/errorHandeler");

//Using primary routes.
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

//deployment
const _dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "api working  " });
  });
}

//Middleware for errors
app.use(errorMIddleware);

module.exports = app;
