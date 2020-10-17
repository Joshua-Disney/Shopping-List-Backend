exports.up = function (knex) {
  return knex.schema.table("accounts", (accounts) => {
    accounts.dropColumn("email");
    accounts.dropColumn("password");
  });
};

exports.down = function (knex) {
  return knex.schema.table("accounts", (accounts) => {
    accounts.string("email", 128).nullable();
    accounts.string("password", 128).nullable();
  });
};
