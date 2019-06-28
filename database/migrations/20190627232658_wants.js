exports.up = function(knex) {
  return knex.schema.createTable("wants", wants => {
    wants.increments();

    wants.string("name", 128).notNullable();

    wants
      .integer("profile_id")
      .unsigned()
      .references("id")
      .inTable("profiles")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("wants");
};
