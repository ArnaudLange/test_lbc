//Require the dev-dependencies
const mocha = require("mocha");
const describe = mocha.describe;
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const sinon = require("sinon");

describe("API tests - fizzbuzz endpoint", () => {
  const app = require("../../../../src/application/index");
  describe("GET /fizzbuzz", () => {
    it("it should return 200 and list of strings from 1 to 10", async () => {
      const res = await chai
        .request(app)
        .get("/fizzbuzz?int1=2&int2=3&limit=10&str1=fizz&str2=buzz")
        .set("content-type", "application/json")
        .send();

      expect(res.status).to.eql(200);
      expect(res.body).to.deep.eql([
        "1",
        "fizz",
        "buzz",
        "fizz",
        "5",
        "fizzbuzz",
        "7",
        "fizz",
        "buzz",
        "fizz",
      ]);
    });

    it("it should return 200 and list of strings from 1 to 10 for negative int1", async () => {
      const res = await chai
        .request(app)
        .get("/fizzbuzz?int1=-2&int2=3&limit=10&str1=fizz&str2=buzz")
        .set("content-type", "application/json")
        .send();

      expect(res.status).to.eql(200);
      expect(res.body).to.deep.eql([
        "1",
        "2",
        "buzz",
        "4",
        "5",
        "buzz",
        "7",
        "8",
        "buzz",
        "10",
      ]);
    });

    it("it should return 200 and list of strings from 1 to 10 for negative int1 & int2", async () => {
      const res = await chai
        .request(app)
        .get("/fizzbuzz?int1=-2&int2=-3&limit=10&str1=fizz&str2=buzz")
        .set("content-type", "application/json")
        .send();

      expect(res.status).to.eql(200);
      expect(res.body).to.deep.eql([
        "1",
        "2",
        "3",
        "4",
        "5",
        "fizzbuzz",
        "7",
        "8",
        "9",
        "10",
      ]);
    });

    it("it should return 400 - int1 is not an int", async () => {
      const res = await chai
        .request(app)
        .get("/fizzbuzz?int1=fail&int2=3&limit=10&str1=fizz&str2=buzz")
        .set("content-type", "application/json")
        .send();

      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        "Error - int1 & int2 parameters must be integers"
      );
    });

    it("it should return 400 - int2 is not an int", async () => {
      const res = await chai
        .request(app)
        .get("/fizzbuzz?int1=2&int2=fail&limit=10&str1=fizz&str2=buzz")
        .set("content-type", "application/json")
        .send();

      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        "Error - int1 & int2 parameters must be integers"
      );
    });

    it("it should return 400 - limit is not an int", async () => {
      const res = await chai
        .request(app)
        .get("/fizzbuzz?int1=2&int2=3&limit=fail&str1=fizz&str2=buzz")
        .set("content-type", "application/json")
        .send();

      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        "Error - limit parameter must be a positive integer"
      );
    });

    it("it should return 400 - limit is negative", async () => {
      const res = await chai
        .request(app)
        .get("/fizzbuzz?int1=2&int2=3&limit=-10&str1=fizz&str2=buzz")
        .set("content-type", "application/json")
        .send();

      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        "Error - limit parameter must be a positive integer"
      );
    });
  });
});
