exports.up = function(knex) {
  return knex.schema.createTable("needs", needs => {
    needs.increments("id");

    needs.string("name", 128).notNullable();

    needs.boolean("is_added").notNullable();

    needs
      .integer("profile_id")
      .unsigned()
      .references("id")
      .inTable("profiles")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("needs");
};
