const express = require("express");

const configureMiddleware = require("./middleware.js");
const authRouter = require("../auth/authRouter.js");
const accountsRouter = require("../accounts/accountsRouter.js");

const server = express();

configureMiddleware(server);

server.use("/api/auth", authRouter);
server.use("/api/accounts", accountsRouter);

module.exports = server;
