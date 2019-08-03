const express = require("express");
const obscurity = require("helmet");
const actionsRouter = require("./data/actions/actionsRouter");
const projectsRouter = require("./data/projects/projectsRouter");
const server = express();

server.use(obscurity());
server.use(express.json());
// server.use("/api/projects", projectsRouter);
// server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send("<h1>Sprint Time</h1>");
});

module.exports = server;
