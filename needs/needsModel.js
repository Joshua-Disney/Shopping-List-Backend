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
  return db("needs");
}

function findBy(filter) {
  return db("needs").where(filter);
}

function findById(id) {
  return db("needs")
    .where({ id })
    .first();
}

function insert(need) {
  return db("needs")
    .insert(need)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db("needs")
    .where({ id })
    .update(post);
}

function remove(id) {
  return db("needs")
    .where({ id })
    .del();
}
