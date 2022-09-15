const winston = require("winston");

class Logger {
  /**
   * Sets up a simple winston logger
   *
   * @returns winston logger
   */
  static setupLogger() {
    const consoleTransport = new winston.transports.Console();
    const myWinstonOptions = {
      transports: [consoleTransport],
    };
    return new winston.createLogger(myWinstonOptions);
  }
}

module.exports = Logger;
