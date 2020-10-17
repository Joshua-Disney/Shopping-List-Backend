exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("accounts").insert([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
      ]);
    })
    .then(() => {
      knex.raw(
        "SELECT setval(pg_get_serial_sequence('accounts', 'id');, (SELECT MAX(id)+1 from \"accounts\"));"
      );
    });
};
// pg_get_serial_sequence('product', 'id');
