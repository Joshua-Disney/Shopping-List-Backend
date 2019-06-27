const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("accounts").select("email", "password");
}

function findBy(filter) {
  return db("accounts").where(filter);
}

async function add(account) {
  const [id] = await db("accounts").insert(account, "id");

  return findById(id);
}

function findById(id) {
  return db("accounts")
    .where({ id })
    .first();
}
