const app = require("../../app/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const HTTP_STATUS = require("../../utils/constants/httpStatus");
const UserFixtures = require("../fixtures/user");

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe("Auth", function () {
  describe("User Authorization", function () {
    it("should throw error if user not found", async function () {
      const token = await UserFixtures.getUserToken(0);
      const resp = await request(app)
        .get("/api/v1/")
        .set({ Authorization: `Bearer ${token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
  });
});
