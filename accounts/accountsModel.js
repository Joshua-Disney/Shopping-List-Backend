const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db("accounts");
}

function findBy(filter) {
  return db("accounts").where(filter);
}

function findById(id) {
  return db("accounts")
    .where({ id })
    .first();
}

function insert(account) {
  return db("accounts")
    .insert(account)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db("accounts")
    .where({ id })
    .update(post);
}

function remove(id) {
  return db("accounts")
    .where({ id })
    .del();
}
