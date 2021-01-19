const express = require("express");

const configureMiddleware = require("./middleware.js");
const restricted = reqire("../auth/restrictedMiddleware.js");

const authRouter = require("../auth/authRouter.js");
const accountsRouter = require("../accounts/accountsRouter.js");
const usersRouter = require("../users/usersRouter.js");
const profilesRouter = require("../profiles/profilesRouter.js");
const needsRouter = require("../needs/needsRouter.js");
const wantsRouter = require("../wants/wantsRouter.js");

const server = express();

configureMiddleware(server);

server.use("/api/auth", authRouter);
server.use("/api/accounts", restricted, accountsRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/profiles", restricted, profilesRouter);
server.use("/api/needs", restricted, needsRouter);
server.use("/api/wants", restricted, wantsRouter);

module.exports = server;
