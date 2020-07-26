"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _error = require("../helpers/error");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @description express-validator schema validator
 *
 * @param {Array} schema
 * @param {Number} status - http statusCode
 *
 * @returns {Array} array of validation results and middleware
 */
var _default = function _default(schemas) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;

  var validationCheck = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, _, next) {
      var errors, mappedErrors, validationErrors;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              errors = (0, _expressValidator.validationResult)(request);
              request = _objectSpread(_objectSpread({}, request), (0, _expressValidator.matchedData)(request));

              if (errors.isEmpty()) {
                _context.next = 6;
                break;
              }

              mappedErrors = Object.entries(errors.mapped()).reduce(function (accumulator, _ref2) {
                var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
                    key = _ref3[0],
                    value = _ref3[1];

                accumulator[key] = value.msg;
                return accumulator;
              }, {});
              validationErrors = new _error.ApplicationError(status, 'validation error', mappedErrors);
              return _context.abrupt("return", next(validationErrors));

            case 6:
              return _context.abrupt("return", next());

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function validationCheck(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  return [].concat((0, _toConsumableArray2["default"])(schemas.length && [schemas]), [validationCheck]);
};

exports["default"] = _default;