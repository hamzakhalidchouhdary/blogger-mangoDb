const HTTP_STATUS = require("../../../utils/constants/httpStatus");
const User = require("./user");

function Reader(userDetails) {
  User.call(this, userDetails);

  this.createArticle = function () {
    throw Object({
      message: "not authorized to create new users",
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  };
  this.updateArticle = function () {
    throw Object({
      message: "not authorized to create new users",
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  };
}

Reader.prototype = new User();
Reader.prototype.role = "reader";

module.exports = Reader;
