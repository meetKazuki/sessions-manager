"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uaParserJs = _interopRequireDefault(require("ua-parser-js"));

var _error = require("../helpers/error");

var _auth = require("../helpers/auth");

var _models = _interopRequireDefault(require("../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var User = _models["default"].User,
    Session = _models["default"].Session;
var _default = {
  signup: function () {
    var _signup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response) {
      var existingUser, user, token, uaParser, userDevice, session;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return User.getExistingUser(request.body.email);

            case 2:
              existingUser = _context.sent;

              if (!existingUser) {
                _context.next = 5;
                break;
              }

              throw new _error.ApplicationError(409, 'you are already registered');

            case 5:
              _context.next = 7;
              return User.create(request.body);

            case 7:
              user = _context.sent;
              token = (0, _auth.generateToken)(user);
              uaParser = (0, _uaParserJs["default"])(request.headers['user-agent']);
              userDevice = {
                deviceId: request.fingerprint.hash,
                deviceName: "".concat(uaParser.os.name, " ").concat(uaParser.browser.name),
                location: "".concat(request.ipInfo.city, " ").concat(request.ipInfo.country),
                ipAddress: "".concat(request.ipInfo.ip)
              };
              session = _objectSpread({
                userId: user.id
              }, userDevice);
              _context.next = 14;
              return Session.create(session);

            case 14:
              return _context.abrupt("return", response.status(201).json({
                status: 'success',
                data: {
                  user: user,
                  session: session,
                  token: token
                }
              }));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function signup(_x, _x2) {
      return _signup.apply(this, arguments);
    }

    return signup;
  }(),
  signin: function () {
    var _signin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response) {
      var _request$body, email, password, user, isPassword, token, fingerPrint, getSession, uaParser, userDevice, session;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _request$body = request.body, email = _request$body.email, password = _request$body.password;
              _context2.next = 3;
              return User.getExistingUser(email);

            case 3:
              user = _context2.sent;

              if (user) {
                _context2.next = 6;
                break;
              }

              throw new _error.ApplicationError(401, 'email or password is incorrect');

            case 6:
              _context2.next = 8;
              return user.validatePassword(password);

            case 8:
              isPassword = _context2.sent;

              if (isPassword) {
                _context2.next = 11;
                break;
              }

              throw new _error.ApplicationError(401, 'email or password is incorrect');

            case 11:
              token = (0, _auth.generateToken)(user); // search for device fingerprint in session table
              // if fingerprint does not exist, save device details plus new fingerprint in
              // the database as a new session for a user
              // else proceed and log in user

              fingerPrint = request.fingerprint.hash;
              _context2.next = 15;
              return Session.findOne({
                where: {
                  deviceId: fingerPrint
                }
              });

            case 15:
              getSession = _context2.sent;

              if (getSession) {
                _context2.next = 23;
                break;
              }

              uaParser = (0, _uaParserJs["default"])(request.headers['user-agent']);
              userDevice = {
                deviceId: fingerPrint,
                deviceName: "".concat(uaParser.os.name, " ").concat(uaParser.browser.name),
                location: "".concat(request.ipInfo.city, " ").concat(request.ipInfo.country),
                ipAddress: "".concat(request.ipInfo.ip)
              };
              _context2.next = 21;
              return Session.create(_objectSpread({
                userId: user.id
              }, userDevice));

            case 21:
              session = _context2.sent;
              return _context2.abrupt("return", response.status(200).json({
                status: 'success',
                data: {
                  user: user,
                  session: session,
                  token: token
                }
              }));

            case 23:
              return _context2.abrupt("return", response.status(200).json({
                status: 'success',
                data: {
                  user: user,
                  token: token
                }
              }));

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function signin(_x3, _x4) {
      return _signin.apply(this, arguments);
    }

    return signin;
  }()
};
exports["default"] = _default;