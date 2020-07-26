"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundError = exports.ApplicationError = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @class ApplicationError
 * @description base error class for application
 * @extends Error
 */
var ApplicationError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(ApplicationError, _Error);

  var _super = _createSuper(ApplicationError);

  /**
   * @description initializes the error class
   *
   * @param {number} statusCode status code of the request
   * @param {string} message error message
   * @param {array} errors an array containing errors
   */
  function ApplicationError(statusCode) {
    var _this;

    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'an error occurred';
    var errors = arguments.length > 2 ? arguments[2] : undefined;
    (0, _classCallCheck2["default"])(this, ApplicationError);
    _this = _super.call(this, message);
    _this.statusCode = statusCode || 500;
    _this.message = message;
    _this.errors = errors;
    return _this;
  }

  return ApplicationError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
/**
 * @class NotFoundError
 * @description error class for resource not found
 * @extends ApplicationError
 */


exports.ApplicationError = ApplicationError;

var NotFoundError = /*#__PURE__*/function (_ApplicationError) {
  (0, _inherits2["default"])(NotFoundError, _ApplicationError);

  var _super2 = _createSuper(NotFoundError);

  /**
   * @description initialize error class
   *
   * @param {string} message error message
   */
  function NotFoundError(message) {
    (0, _classCallCheck2["default"])(this, NotFoundError);
    return _super2.call(this, 404, message || 'resource not found');
  }

  return NotFoundError;
}(ApplicationError);

exports.NotFoundError = NotFoundError;