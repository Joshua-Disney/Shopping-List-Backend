const server = require("express")();
const http = require("http").createServer(server);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");
});

const configureMiddleware = require("./middleware.js");

const authRouter = require("../auth/authRouter.js");
const accountsRouter = require("../accounts/accountsRouter.js");
const profilesRouter = require("../profiles/profilesRouter.js");
const needsRouter = require("../needs/needsRouter.js");
const wantsRouter = require("../wants/wantsRouter.js");

configureMiddleware(server);

server.use("/api/auth", authRouter);
server.use("/api/accounts", accountsRouter);
server.use("/api/profiles", profilesRouter);
server.use("/api/needs", needsRouter);
server.use("/api/wants", wantsRouter);

server.use(function (req, res, next) {
  res.io = io;
  next();
});

module.exports = { http, server };
