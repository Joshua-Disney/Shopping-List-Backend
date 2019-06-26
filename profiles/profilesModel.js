const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("profiles").select("email", "other_stuff", "even_more_stuff");
}

function findBy(filter) {
  return db("profiles").where(filter);
}

async function add(profile) {
  const [id] = await db("profiles").insert(profile, "id");

  return findById(id);
}

function findById(id) {
  return db("profiles")
    .where({ id })
    .first();
}
