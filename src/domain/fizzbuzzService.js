const Logger = require("../domain/logger");

const logger = Logger.setupLogger();

class FizzbuzzService {
  constructor(sqlInfra) {
    this._sqlInfra = sqlInfra;
  }

  /**
   * Takes 5 parameters and compute simple fizzbuzz
   * Logs request to be able to retrieve stats
   *
   * @param {Integer} int1 first integer to check multiples
   * @param {Integer} int2 second integer to check multiples
   * @param {Integer} limit size of the array of number to perform the fizzbuzz on
   * @param {String} str1 first string to replace multiples with (fizz)
   * @param {String} str2 seconde string to replace multiples with (buzz)
   * @return {Array<String>} Array of string with the result of the fizzbuzz
   */
  async computeFizzbuzz(int1, int2, limit, str1, str2) {
    await this.logRequest(int1, int2, limit, str1, str2);

    const intArray = [...Array(limit).keys()].map((i) => i + 1);

    return intArray.map((el) => {
      if (el % (int1 * int2) === 0) {
        return `${str1}${str2}`;
      }
      if (el % int1 === 0) {
        return str1;
      }
      if (el % int2 === 0) {
        return str2;
      }
      return `${el}`;
    });
  }

  /**
   * Takes 5 parameters and logs them to database
   *
   * @param {Integer} int1 first integer to check multiples
   * @param {Integer} int2 second integer to check multiples
   * @param {Integer} limit size of the array of number to perform the fizzbuzz on
   * @param {String} str1 first string to replace multiples with (fizz)
   * @param {String} str2 seconde string to replace multiples with (buzz)
   */
  async logRequest(int1, int2, limit, str1, str2) {
    const sqlInfra = this._sqlInfra;
    try {
      await sqlInfra("fizzbuzz.requests").insert({
        int1: int1,
        int2: int2,
        array_limit: limit,
        str1: str1,
        str2: str2,
        date: sqlInfra.fn.now(6),
      });
    } catch (e) {
      logger.warn(
        `Error while trying to store request: ${int1}, ${int2}, ${limit}, ${str1}, ${str2}`
      );
      logger.warn(`Database returned error: ${e}`);
    }
  }
}

module.exports = FizzbuzzService;
