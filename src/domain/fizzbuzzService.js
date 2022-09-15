class FizzbuzzService {
  constructor() {
    this.test = "test";
  }

  /**
   * Takes 5 parameters and compute simple fizzbuzz
   *
   * @param {Integer} int1 first integer to check multiples
   * @param {Integer} int2 second integer to check multiples
   * @param {Integer} limit size of the array of number to perform the fizzbuzz on
   * @param {String} str1 first string to replace multiples with (fizz)
   * @param {String} str2 seconde string to replace multiples with (buzz)
   * @return {Array<String>} Array of string with the result of the fizzbuzz
   */
  static computeFizzbuzz(int1, int2, limit, str1, str2) {
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
}

module.exports = FizzbuzzService;
