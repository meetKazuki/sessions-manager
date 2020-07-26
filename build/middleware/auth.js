"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = require("dotenv");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _error = require("../helpers/error");

var _models = require("../models");

(0, _dotenv.config)();
var _default = {
  /**
     * Verify Token
     *
     * @param {Object} request - the request object
     * @param {Object} response - express response object
     * @param {Function} next
     *
     * @returns {void} - undefined
     */

  /* verifyToken: async (request, response, next) => {
    const authHeader = request.headers.authorization;
     if (authHeader === '') throw new ApplicationError(400, 'No token provided. Please signup or login');
     if (!authHeader) throw new ApplicationError(412, 'Authorization header not set');
     const token = authHeader.split(' ')[1];
     jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
      if (error) return next(new ApplicationError(401, `${error.message}`));
       const { id: userId } = decodedToken;
      const user = await User.findByPk(userId);
       if (!user) return next(new ApplicationError(403, 'Invalid credentials'));
       request.user = user;
       return next();
    });
  }, */
  verifyToken: function verifyToken(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) throw new _error.ApplicationError(412, 'Authorization header not set');
    var token = authHeader.split(' ')[1];

    _jsonwebtoken["default"].verify(token, process.env.JWT_KEY, /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(error, decodedToken) {
        var id, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!error) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", next(new _error.ApplicationError(401, "".concat(error.message))));

              case 2:
                id = decodedToken.id;
                _context.next = 5;
                return _models.User.findByPk(id);

              case 5:
                user = _context.sent;

                if (user) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", next(new _error.ApplicationError(403, 'Invalid credentials')));

              case 8:
                request.user = user;
                return _context.abrupt("return", next());

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }
};
exports["default"] = _default;