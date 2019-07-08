const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  findProfileNeeds,
  findProfileWants,
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
