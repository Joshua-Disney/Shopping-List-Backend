exports.up = function(knex) {
  return knex.schema.createTable("wants", wants => {
    wants.increments("id");

    wants.string("name", 128).notNullable();

    wants.boolean("is_added").notNullable();

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
