class FizzbuzzValidator {
  /**
   * Takes the incoming request and validates query params
   * int1, int2 and limit are mandatory
   * int1 and int2 must be integers
   * limit must be a positive integer
   *
   * @param req incoming request
   */
  static validateRequest(req) {
    if (!req.query.int1 || !req.query.int2) {
      throw {
        status: 400,
        message: "Error - int1 & int2 parameters are mandatory",
      };
    }

    if (!req.query.limit) {
      throw {
        status: 400,
        message: "Error - limit parameter is mandatory",
      };
    }

    const int1 = Number(req.query.int1);
    const int2 = Number(req.query.int2);
    if (!Number.isInteger(int1) || !Number.isInteger(int2)) {
      throw {
        status: 400,
        message: "Error - int1 & int2 parameters must be integers",
      };
    }

    const limit = Number(req.query.limit);
    if (!(Number.isInteger(limit) && limit > 0)) {
      throw {
        status: 400,
        message: "Error - limit parameter must be a positive integer",
      };
    }
  }
}

module.exports = FizzbuzzValidator;
