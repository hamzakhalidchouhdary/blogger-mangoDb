const UserModel = require("../models").User;
const {
  generateJWT,
  compareHashedPassword,
} = require("../../utils/common/auth");
const ServiceResponse = require("../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../utils/constants/httpStatus");

const signupNewUser = async function (req, res) {
  try {
    const { body: userDetails } = req;
    const newUser = await UserModel.new(userDetails);
    const jwToken = await generateJWT({ userId: newUser.id });
    res.status(HTTP_STATUS.CREATED).json({ token: jwToken });
    return;
  } catch (err) {
    ServiceResponse.error(res, { msg: "" });
  }
};

const loginUser = async function (req, res) {
  try {
    const { username = null, password = null } = req.body;
    const user = await UserModel.findByUsername(username);
    if (
      !user ||
      !password ||
      !(await compareHashedPassword(password, user.hashedPassword))
    )
      throw Object({
        message: "username or password incorrect",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    const token = await generateJWT({ userId: user.id });
    res.status(HTTP_STATUS.OK).json({ token });
  } catch (err) {
    ServiceResponse.error(res, err);
  }
};

module.exports = {
  signupNewUser,
  loginUser,
};
