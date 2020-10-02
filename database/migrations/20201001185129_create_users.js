exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("users", (users) => {
    users.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    users.string("email", 128).notNullable().unique();

    users.string("password", 128).notNullable();

    users
      .integer("account_id")
      .unsigned()
      .references("id")
      .inTable("accounts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
