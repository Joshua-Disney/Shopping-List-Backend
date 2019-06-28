exports.up = function(knex) {
  return knex.schema.createTable("profiles", profiles => {
    profiles.increments();

    profiles.string("name", 128).notNullable();

    profiles
      .integer("account_id")
      .unsigned()
      .references("id")
      .inTable("accounts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("profiles");
};
