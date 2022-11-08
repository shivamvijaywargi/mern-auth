const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(`Connected to DB: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`DB Connection error`);
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectToDB;
