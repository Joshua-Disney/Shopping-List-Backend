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

  const updates = previousUsers.map((user) => {
    return db("accounts")
      .where("id", user.account_id)
      .update({ email: user.email, password: user.password });
  });

  await Promise.all(updates);

  //Kill all accounts with no email or password
  await db("accounts").where("email", null).del()
  

  return knex.schema.alterTable("accounts", (accounts) => {
    accounts.string("email", 128).notNullable().unique().alter();
    accounts.string("password", 128).notNullable().alter();
  });
};
