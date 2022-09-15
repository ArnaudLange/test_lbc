const mocha = require("mocha");
const describe = mocha.describe;
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const sinon = require("sinon");
const FizzbuzzService = require("../../src/domain/fizzbuzzService");

describe("Unit tests for fizzbuzzService", () => {
  const initializeKnex = () => {
    return require("knex")({
      client: "pg",
      connection: {
        host: process.env.POSTGRESQL_URI,
        user: "login",
        password: "password",
        database: "test-lbc",
      },
    });
  };

  describe("getMostWantedRequest", () => {
    it("Should return most wanted request", async function () {
      const knexStub = await initializeKnex();
      const fromStub = sinon.stub().resolves([
        {
          int1: 2,
          int2: 3,
          array_limit: 10,
          str1: "fizz",
          str2: "buzz",
          hits: 10,
        },
        {
          int1: 1,
          int2: 2,
          array_limit: 10,
          str1: "fizz",
          str2: "buzz",
          hits: 6,
        },
        {
          int1: 3,
          int2: 4,
          array_limit: 10,
          str1: "fizz",
          str2: "buzz",
          hits: 1,
        },
      ]);

      sinon
        .stub(knexStub, "select")
        .withArgs("*")
        .callsFake(() => {
          return {
            from: fromStub,
          };
        });

      // When
      const classUnderTest = new FizzbuzzService(knexStub);
      const response = await classUnderTest.getMostWantedRequest();

      // Then
      const validResponse = {
        int1: 2,
        int2: 3,
        limit: 10,
        str1: "fizz",
        str2: "buzz",
        hits: 10,
      };
      expect(response).to.deep.eql(validResponse);
    });

    it("Should return message no request", async function () {
      const knexStub = await initializeKnex();
      const fromStub = sinon.stub().resolves([]);

      sinon
        .stub(knexStub, "select")
        .withArgs("*")
        .callsFake(() => {
          return {
            from: fromStub,
          };
        });

      // When
      const classUnderTest = new FizzbuzzService(knexStub);
      const response = await classUnderTest.getMostWantedRequest();

      // Then
      const validResponse = {
        message: "No request yet.",
      };
      expect(response).to.deep.eql(validResponse);
    });

    it("Should throw error", async function () {
      const knexStub = await initializeKnex();
      const fromStub = sinon.stub().throws("error");

      sinon
        .stub(knexStub, "select")
        .withArgs("*")
        .callsFake(() => {
          return {
            from: fromStub,
          };
        });

      // When
      const classUnderTest = new FizzbuzzService(knexStub);
      let response, err;
      try {
        response = await classUnderTest.getMostWantedRequest();
      } catch (error) {
        err = error;
      }

      // Then
      expect(response).to.not.exist;
      expect(err.message).to.eql("Error while calling database: error");
    });
  });
});
