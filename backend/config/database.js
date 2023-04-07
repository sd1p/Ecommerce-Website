const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex:true
    })
    .then((info) => {
      console.log(`Mongodb connected with server ${info.connection.host}`);
    });
};

module.exports = connectDatabase;
