//Require the dev-dependencies
const mocha = require("mocha");
const describe = mocha.describe;
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

describe("API tests - statistics endpoint", () => {
  const app = require("../../../src/application/index");
  describe("GET /statistics", () => {
    it("it should return 200 and most used parameters", async () => {
      const res = await chai
        .request(app)
        .get("/statistics")
        .set("content-type", "application/json")
        .send();

      expect(res.status).to.eql(200);
      expect(res.body).to.have.deep.property("int1");
      expect(res.body).to.have.deep.property("int2");
      expect(res.body).to.have.deep.property("limit");
      expect(res.body).to.have.deep.property("str1");
      expect(res.body).to.have.deep.property("str2");
      expect(res.body).to.have.deep.property("hits");
    });
  });
});
