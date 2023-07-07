require("dotenv").config();
const express = require("express");
const router = require("./routers/index");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STR = process.env.MONGODB_CONNECTION_STR_TEST;

const app = express();

app.use(express.json());
app.use("/", router);

const connectMongoDB = async () => {
  await mongoose.connect(`${MONGODB_CONNECTION_STR}`);
}

const startServer = async function () {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`APP STARTED AT ${PORT} by process id ${process.pid}`);
    });
  } catch(err) {
    throw err
  }
};

startServer().catch(err => console.log(err));

module.exports = app;
