const db = require("../database/dbConfig.js");

module.exports = {
  findBy,
  findOne,
  insert,
};

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
