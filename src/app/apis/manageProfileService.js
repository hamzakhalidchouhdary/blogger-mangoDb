const ServiceResponse = require("../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../utils/constants/httpStatus");

const createProfile = function (req, res) {
  try {
    res.status(HTTP_STATUS.CREATED).end();
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  }
};

const updateProfile = async function (req, res) {
  try {
    const { user, body: payload } = req;
    const updatedProfile = await user.updateProfile(payload);
    res.status(HTTP_STATUS.OK).json(updatedProfile);
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  }
};

const deleteProfile = function (req, res) {
  try {
    res.status(HTTP_STATUS.OK).end();
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  }
};

const getProfile = function (req, res) {
  try {
    res.status(HTTP_STATUS.OK).end();
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  }
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile,
};
