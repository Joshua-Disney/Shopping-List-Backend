const db = require("../dbConfig");

exports.up = function (knex) {
  const accounts = db("accounts");

  const users = accounts.map((account) => {
    return {
      email: account.email,
      password: account.password,
      account_id: account.id,
    };
  });

  db.batchInsert("users", users);
};

exports.down = function (knex) {
  // fetch previous users
  const previousUsers = db("users").where(
    "created_at",
    "<=",
    "2020-10-03T00:00:00.000Z"
  );

  previousUsers.forEach((user) => {
    db("accounts")
      .where("id", user.account_id)
      .update({ email: user.email, password: user.password });
  });
};
