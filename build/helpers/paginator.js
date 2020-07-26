"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Implements pagination support
 *
 * @function
 *
 * @param {Object} Source - Model object
 * @param {Object} options
 *
 * @returns {Object} returns object
 */
var paginator = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(Source, options) {
    var data, page, limit, dataSource, dataToSource, otherOptions, offset, _yield$dataSource, result, _count, _yield$Source$findAnd, count;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = [];
            page = options.page, limit = options.limit, dataSource = options.dataSource, dataToSource = options.dataToSource, otherOptions = (0, _objectWithoutProperties2["default"])(options, ["page", "limit", "dataSource", "dataToSource"]);
            offset = limit * (+page - 1);

            if (Source) {
              _context.next = 10;
              break;
            }

            _context.next = 6;
            return dataSource({
              data: dataToSource,
              options: _objectSpread({
                limit: limit,
                offset: offset
              }, otherOptions)
            });

          case 6:
            _yield$dataSource = _context.sent;
            result = _yield$dataSource.data;
            _count = _yield$dataSource.count;
            return _context.abrupt("return", {
              data: result,
              count: _count
            });

          case 10:
            _context.next = 12;
            return Source.findAndCountAll(_objectSpread({}, otherOptions));

          case 12:
            _yield$Source$findAnd = _context.sent;
            count = _yield$Source$findAnd.count;

            if (!count) {
              _context.next = 18;
              break;
            }

            _context.next = 17;
            return Source.findAll(_objectSpread(_objectSpread({}, otherOptions), {}, {
              limit: limit,
              offset: offset
            }));

          case 17:
            data = _context.sent;

          case 18:
            return _context.abrupt("return", {
              data: data,
              count: count
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function paginator(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = paginator;
exports["default"] = _default;