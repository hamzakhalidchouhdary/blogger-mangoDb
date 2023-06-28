const HTTP_STATUS = require("../../../utils/constants/httpStatus");
const ArticleModel = require("../../models").Article;
const CommentModel = require("../../models").Comment;
const UserModel = require("../../models").User;
const _ = require("lodash");
const ERROR_TEXT = require("../../../utils/constants/errorText");

function User(userDetails = {}) {
  Object.call(this, userDetails);

  this.id = userDetails.id || null;
  this.firstName = userDetails.firstName || "";
  this.lastName = userDetails.lastName || "";
  this.username = userDetails.username || "";
  this.role = userDetails.role || "";

  const isCommentOwner = async (commentId) => {
    const commentDetails = await CommentModel.getById(commentId);
    return commentDetails.createdBy == this.id;
  };
  this.createUser = function () {
    throw Object({
      message: "not authorized to create new users",
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  };
  this.updateUser = function () {
    throw Object({
      message: "not authorized to create new users",
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  };
  this.deleteUser = function () {
    throw Object({
      message: "not authorized to create new users",
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  };
  this.updateProfile = async function (updateProfile) {
    return UserModel.modify(updateProfile, this.id);
  };
  this.createArticle = async function (articleDetails) {
    articleDetails.createdBy = articleDetails.updatedBy = this.id;
    return ArticleModel.new(articleDetails);
  };
  this.updateArticle = function (articleDetails, articleId) {
    if (!_.isEmpty(articleDetails)) articleDetails.updatedBy = this.id;
    return ArticleModel.modify(articleDetails, articleId);
  };
  this.deleteArticle = function () {
    throw Object({
      message: "not authorized to create new users",
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  };
  this.createComment = async function (content = "", articleId = null) {
    const commentObj = {
      content,
      articleId,
      createdBy: this.id,
      updatedBy: this.id,
    };
    return CommentModel.new(commentObj);
  };
  this.updateComment = async function (content = "", commentId = null) {
    if (!(await isCommentOwner(commentId)))
      throw Object({
        message: ERROR_TEXT.NOT_A_OWNER,
        status: HTTP_STATUS.NOT_ALLOWED,
      });

    return CommentModel.modify(content, commentId, this.id);
  };
  this.deleteComment = async function (commentId = null) {
    if (!(await isCommentOwner(commentId)))
      throw Object({
        message: ERROR_TEXT.NOT_A_OWNER,
        status: HTTP_STATUS.NOT_ALLOWED,
      });

    return CommentModel.remove(commentId, this.id);
  };
  this.viewArticleComments = async function (articleId) {
    return CommentModel.getAllByArticleId(articleId);
  };
  this.getAllArticles = async function () {
    return ArticleModel.findByAuthorId(this.id);
  };
}

User.prototype = new Object();

module.exports = User;
