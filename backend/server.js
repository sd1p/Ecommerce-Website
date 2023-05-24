const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
//handling uncaughtException errors
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Error`);
  process.exit(1);
});

//config .env variables
dotenv.config({ path: "backend/config/config.env" });

//connecting to db
connectDatabase();

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
