require("dotenv").config();
const cluster = require("cluster");
const CPUCount = require("os").cpus().length;
const express = require("express");
const router = require("./routers/index");

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

const app = express();

app.use(express.json());
app.use("/", router);

const startServer = function () {
  app.listen(PORT, () => {
    console.log(`APP STARTED AT ${PORT} by process id ${process.pid}`);
  });
};

if (cluster.isMaster && ENV != "test") {
  for (let i = 0; i < CPUCount; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
  cluster.on("error", (err) => {
    console.log(`$$ worker ${worker.process.pid} has error ${err}`);
    cluster.fork();
  });
} else {
  startServer();
}

module.exports = app;
