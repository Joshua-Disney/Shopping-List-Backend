const db = require("../dbConfig");

exports.up = async function (knex) {
  const accounts = await db("accounts");

  const users = accounts.map((account) => {
    return {
      email: account.email,
      password: account.password,
      account_id: account.id,
    };
  });

  return db.batchInsert("users", users);
};

exports.down = async function (knex) {
  // fetch previous users
  const previousUsers = await db("users")
  .where(
    "created_at",
    "<=",
    "2020-10-09T00:00:00.000Z"
  );

  const updates = previousUsers.map((user) => {
    return db("accounts")
      .where("id", user.account_id)
      .update({ email: user.email, password: user.password });
  });

  await Promise.all(updates);

  return knex.schema.alterTable("accounts", (accounts) => {
    accounts.string("email", 128).notNullable().unique().alter();
    accounts.string("password", 128).notNullable().alter();
  });
};
