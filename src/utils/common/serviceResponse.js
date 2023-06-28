const HTTP_STATUS = require("../constants/httpStatus");
const RESPONSE_TEXT = require("../constants/errorText");

const errorResponse = function (res, { message, status }) {
  res
    .status(status || HTTP_STATUS.INTERNAL_ERROR)
    .send(message || RESPONSE_TEXT.INTERNAL_ERROR);
};

module.exports = {
  error: errorResponse,
};
