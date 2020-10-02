exports.up = function (knex) {
  knex.schema.table("accounts", (accounts) => {
    accounts.dropColumn("email");
    accounts.dropColumn("password");
  });
};

exports.down = function (knex) {
  knex.schema.table("accounts", (accounts) => {
    accounts.string("email", 128).notNullable().unique();

    accounts.string("password", 128).notNullable();
  });
};
