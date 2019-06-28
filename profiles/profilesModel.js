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
  return db("profiles");
}

function findBy(filter) {
  return db("profiles").where(filter);
}

function findById(id) {
  return db("profiles")
    .where({ id })
    .first();
}

function insert(profile) {
  return db("profiles")
    .insert(profile)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db("profiles")
    .where({ id })
    .update(post);
}

function remove(id) {
  return db("profiles")
    .where({ id })
    .del();
}
