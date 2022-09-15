const express = require("express");
const Logger = require("../domain/logger");
const knexMiddleware = require("./middlewares/knex-middleware");

// Import des routes
const fizzBuzzRouter = require("./routes/fizzbuzz");
const statisticsRouter = require("./routes/statistics");

const app = express();

const logger = Logger.setupLogger();

function logRequest(req, res, next) {
  logger.info(req.url);
  next();
}
app.use(logRequest);

function logError(err, req, res, next) {
  logger.error(err);
  next();
}
app.use(logError);

// initialize db connection as app-wide variable
app.use(knexMiddleware);

// declare endpoints
app.use("/fizzbuzz", fizzBuzzRouter);
app.use("/statistics", statisticsRouter);

// catch 404 and return response
app.use((req, res) => {
  const errStr = `Resource ${req.path} not found`;
  logger.error(errStr);
  res.status(404).json({ message: errStr });
});

// Start the server
if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    logger.info(`App listening on port ${PORT}`);
    logger.info("Press Ctrl+C to quit.");
  });
}

module.exports = app;
