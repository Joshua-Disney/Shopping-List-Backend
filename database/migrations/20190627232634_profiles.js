exports.up = function(knex) {
  return knex.schema.createTable("profiles", profiles => {
    profiles.increments("id");

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

// {
//  id: 23,
//  name: "Disney",
//  account_id: 3
// }

function findById(id) {
  return db("accounts")
    .where({ id })
    .first();
}
