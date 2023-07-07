const app = require("./app");
const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const path = require("path");
//handling uncaughtException errors
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Error`);
  process.exit(1);
});
// console.log((_dirname = path.resolve(__dirname, "config", "config.env")));
//config .env variables
dotenv.config({ path: "backend/config/.env" });

//connecting to db
connectDatabase();

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//deployment
const _dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname1, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "api working  " });
  });
}
console.log(process.env.NODE_ENV);
const server = app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  } else {
    console.log(err);
  }
});

//unhandled pormise rejection (for .env value errors)
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
