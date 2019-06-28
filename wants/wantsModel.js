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
  return db("wants");
}

function findBy(filter) {
  return db("wants").where(filter);
}

function findById(id) {
  return db("wants")
    .where({ id })
    .first();
}

function insert(want) {
  return db("wants")
    .insert(want)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db("wants")
    .where({ id })
    .update(post);
}

function remove(id) {
  return db("wants")
    .where({ id })
    .del();
}
