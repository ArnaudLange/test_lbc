const initializeKnex = async (req, res, next) => {
  if (!req.app.locals.knex) {
    req.app.locals.knex = require("knex")({
      client: "pg",
      connection: {
        host: "localhost",
        user: "login",
        password: "password",
        database: "test-lbc",
      },
    });
  }
  return next();
};

module.exports = initializeKnex;
