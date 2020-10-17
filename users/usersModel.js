const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findOne,
  insert,
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findOne(filter) {
  return db("users").where(filter).first();
}

function insert(user) {
  return db("users")
    .insert(user)
    .then((ids) => ({ id: ids[0] }));
}
