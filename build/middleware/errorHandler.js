"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dotenv = require("dotenv");

var _debug = _interopRequireDefault(require("debug"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

(0, _dotenv.config)();
var DEBUG = (0, _debug["default"])('dev');
/**
 * @function
 * @description a wrapper controller for error handling
 *
 * @param {Object} err error object
 * @param {Object} request express request object
 * @param {Object} response express response object
 * @param {Function} next callback to call next middleware
 *
 * @returns {Object} response from the server
 */

var _default = function _default(err, request, response, next) {
  var isProduction = process.env.NODE_ENV === 'production';
  var errorMessage = {};

  if (err.name === 'MulterError' && err.message === 'Unexpected field') {
    err.message = 'Photo should be added to the "avatar" field';
  }

  if (response.headersSent) {
    return next(err);
  }

  if (!isProduction) {
    DEBUG(err.stack);
    errorMessage = err;
  }

  return response.status(err.statusCode || 500).json({
    status: 'error',
    error: _objectSpread(_objectSpread({
      message: err.message
    }, err.errors && {
      errors: err.errors
    }), !isProduction && {
      trace: errorMessage
    })
  });
};

exports["default"] = _default;