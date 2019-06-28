const express = require("express");

const configureMiddleware = require("./middleware.js");

const authRouter = require("../auth/authRouter.js");
const accountsRouter = require("../accounts/accountsRouter.js");
const profilesRouter = require("../profiles/profilesRouter.js");
const needsRouter = require("../needs/needsRouter.js");
const wantsRouter = require("../wants/wantsRouter.js");

const server = express();

configureMiddleware(server);

server.use("/api/auth", authRouter);
server.use("/api/accounts", accountsRouter);
server.use("/api/profiles", profilesRouter);
server.use("/api/needs", needsRouter);
server.use("/api/wants", wantsRouter);

module.exports = server;
