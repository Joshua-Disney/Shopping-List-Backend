exports.up = function (knex) {
  return knex.schema.createTable("accounts", (accounts) => {
    accounts.increments("id");

    accounts.string("email", 128).notNullable().unique();

    accounts.string("password", 128).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("accounts");
};
