const express = require("express");
const router = express.Router();
const Logger = require("../../domain/logger");
const FizzbuzzService = require("../../domain/fizzbuzzService");

const logger = Logger.setupLogger();

router.get("/", async (req, res) => {
  logger.info("Entering GET /statistics");

  const fizzbuzzService = new FizzbuzzService(req.app.locals.knex);

  try {
    const response = await fizzbuzzService.getMostWantedRequest();
    res.status(200).send(response);
  } catch (error) {
    res.status(error.status).send(error.message);
  }

  logger.info("End of service /GET /statistics");
});

module.exports = router;
