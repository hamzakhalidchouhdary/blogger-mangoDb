const { validationResult } = require("express-validator");

const evaluateValidationRules = async function (rules, req) {
  await Promise.all(rules.map((rule) => rule.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) return;
  throw errors.array();
};

module.exports = {
  evaluateValidationRules,
};
