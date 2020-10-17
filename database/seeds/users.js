
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {account_id: 1, email: "username", password: "password"},
        {account_id: 1, email: "username@email.com", password: "password"},
        {account_id: 3, email: "username1@email.com", password: "password"},
        {account_id: 4, email: "username2@email.com", password: "password"},
        {account_id: 5, email: "username3@email.com", password: "password"},
        {account_id: 6, email: "username4@email.com", password: "password"},
        {account_id: 7, email: "username5@email.com", password: "password"},
        {account_id: 8, email: "username6@email.com", password: "password"},
        {account_id: 9, email: "username7@email.com", password: "password"},
        {account_id: 10, email: "usernam8@email.com", password: "password"},
        {account_id: 11, email: "username9@email.com", password: "password"},
        {account_id: 12, email: "username10@email.com", password: "password"},
        {account_id: 12, email: "username11@email.com", password: "password"},
      ]);
    });
};
