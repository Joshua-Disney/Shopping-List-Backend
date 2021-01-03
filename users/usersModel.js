const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findOne,
  findById,
  insert,
  update,
  remove,
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

function findById(id) {
  return db("users").select("users.id").where({ id }).first();
}

function insert(user) {
  return db("users")
    .insert(user)
    .then((ids) => ({ id: ids[0] }));
}

function update(id, user) {
  return db("users").where({ id }).update(user);
}

function remove(id) {
  return db("users").where({ id }).del();
}
