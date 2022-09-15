const express = require("express");
const winston = require("winston");

const app = express();

// setup logger
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
  transports: [consoleTransport],
};
const logger = new winston.createLogger(myWinstonOptions);

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
