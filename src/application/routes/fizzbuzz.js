const express = require("express");
const router = express.Router();
const Logger = require("../../domain/logger");
const FizzbuzzService = require("../../domain/fizzbuzzService");
const fizzbuzzValidator = require("../validator/fizzbuzzValidator");

const logger = Logger.setupLogger();
const fizzbuzzService = new FizzbuzzService();

router.get("/", async (req, res, next) => {
  logger.info("Entering GET /fizzbuzz");

  try {
    fizzbuzzValidator.validateRequest(req);
  } catch (error) {
    res.status(error.status).send(error.message);
    logger.info("End of service /GET /fizzbuzz");
    return next(error);
  }

  const int1 = Number(req.query.int1);
  const int2 = Number(req.query.int2);
  const limit = Number(req.query.limit);

  const str1 = req.query.str1 || "fizz";
  const str2 = req.query.str2 || "buzz";

  const response = FizzbuzzService.computeFizzbuzz(
    int1,
    int2,
    limit,
    str1,
    str2
  );

  res.status(200).send(response);
  logger.info("End of service /GET /fizzbuzz");
});

module.exports = router;
