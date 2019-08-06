const express = require("express");
const obscurity = require("helmet");
const actionsRouter = require("./data/actions/actionsRouter");
const projectsRouter = require("./data/projects/projectsRouter");
const server = express();

server.use(obscurity());
server.use(logger);
server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send("<h1>Sprint Time</h1>");
});

function logger(req, res, next) {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timestamp = `${hours}:${minutes}:${seconds}`;
  console.log(`${req.method} on path: "${req.originalUrl}" at ${timestamp}`);
  next();
}

module.exports = server;
