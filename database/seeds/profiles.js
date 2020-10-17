exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("profiles")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("profiles").insert([
        { name: "home", account_id: 1 },
        { name: "Disney", account_id: 1 },
        { name: "Adri", account_id: 1 },
        { name: "Thomas", account_id: 1 },
        { name: "home", account_id: 2 },
        { name: "home", account_id: 3 },
        { name: "home", account_id: 4 },
        { name: "home", account_id: 5 },
        { name: "home", account_id: 6 },
        { name: "home", account_id: 7 },
        { name: "home", account_id: 8 },
        { name: "home", account_id: 12 },
        { name: "home", account_id: 12 },
      ]);
    })
    .then(() => {
      knex.raw("ALTER SEQUENCE profiles_id_seq RESTART WITH 14");
    });
};
