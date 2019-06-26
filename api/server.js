const express = require("express");

const configureMiddleware = require("./middleware.js");
const authRouter = require("../auth/authRouter.js");
const profilesRouter = require("../profiles/profilesRouter.js");

const server = express();

configureMiddleware(server);

server.use("/api/auth", authRouter);
server.use("/api/profiles", profilesRouter);

module.exports = server;
