const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  findAccountUsers,
  findAccountProfiles,
  findProfileNeeds,
  findProfileWants,
  insert,
  update,
  remove,
};

function find() {
  return db("accounts");
}

function findBy(filter) {
  return db("accounts").where(filter);
}

function findById(id) {
  return db("accounts").select("accounts.id").where({ id }).first();
}

function findAccountUsers(id) {
  return db("users as u").where("u.account_id", id);
}

function findAccountProfiles(id) {
  return (
    db("profiles as p")
      // .select("p.*")
      // .join("accounts as a", "a.id", "p.account_id")
      .where("p.account_id", id)
  );
}

function findProfileNeeds(id) {
  return (
    db("needs as n")
      // .join("profiles as p", "p.id", "n.profile_id")
      .where("n.profile_id", id)
  );
}

function findProfileWants(id) {
  return (
    db("wants as w")
      // .join("profiles as p", "p.id", "w.profile_id")
      .where("w.profile_id", id)
  );
}

function insert() {
  return db("accounts").insert().returning("id");
}

function update(id, post) {
  return db("accounts").where({ id }).update(post);
}

function remove(id) {
  return db("accounts").where({ id }).del();
}
