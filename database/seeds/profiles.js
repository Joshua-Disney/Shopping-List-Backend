
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {id: 1, name: "home", account_id: 1},
        {id: 2, name: "Disney", account_id: 1},
        {id: 3, name: "Adri", account_id: 1},
        {id: 4, name: "Thomas", account_id: 1},
        {id: 5, name: "home", account_id: 2},
        {id: 6, name: "home", account_id: 3},
        {id: 7, name: "home", account_id: 4},
        {id: 8, name: "home", account_id: 5},
        {id: 9, name: "home", account_id: 6},
        {id: 10, name: "home", account_id: 7},
        {id: 11, name: "home", account_id: 8},
        {id: 12, name: "home", account_id: 12},
        {id: 13, name: "home", account_id: 12},
      ]);
    });
};
