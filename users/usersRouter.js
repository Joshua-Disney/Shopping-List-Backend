const router = require("express").Router();

const Users = require("./usersModel.js");
const restricted = require("../auth/restrictedMiddleware.js");
