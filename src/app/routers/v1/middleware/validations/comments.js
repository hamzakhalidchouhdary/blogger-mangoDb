const { body, validationResult } = require("express-validator");
const serviceResponse = require("../../../../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../../../../utils/constants/httpStatus");
const { evaluateValidationRules } = require("./");

const validateComment = async function (req, res, next) {
  try {
    const validationRules = [
      body("content")
        .exists()
        .withMessage("comment content is required")
        .notEmpty()
        .withMessage("comment content can not empty"),
    ];
    await evaluateValidationRules(validationRules, req);
    return next();
  } catch (err) {
    serviceResponse.error(res, {
      message: err,
      status: HTTP_STATUS.BAD_REQUEST,
    });
  }
};

module.exports = {
  validateComment,
};
