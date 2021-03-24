const localPgConnection = {
  host: "localhost",
  database: "sl",
  user: "postgres",
  password: "M4ttR4yS4y",
  port: "5432",
};

const dbConnection =
  process.env.DATABASE_URL + "?ssl=true" || localPgConnection;
// const dbConnection = process.env.DATABASE_URL;

module.exports = {
  development: {
    // client: "sqlite3",
    client: "pg",
    // connection: {
    //   filename: "./database/db.db3"
    // },
    connection: dbConnection,
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },

  testing: {
    client: "pg",
    connection: dbConnection,
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "pg",
    connection: dbConnection,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
