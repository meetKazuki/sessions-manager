"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _error = require("../helpers/error");

var _models = _interopRequireDefault(require("../models"));

var _paginator = _interopRequireDefault(require("../helpers/paginator"));

var Session = _models["default"].Session;
var _default = {
  getAllSessions: function () {
    var _getAllSessions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response) {
      var user, _request$query, _request$query$page, page, _request$query$limit, limit, _yield$paginator, data, count;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = request.user, _request$query = request.query, _request$query$page = _request$query.page, page = _request$query$page === void 0 ? 1 : _request$query$page, _request$query$limit = _request$query.limit, limit = _request$query$limit === void 0 ? 10 : _request$query$limit;
              _context.next = 3;
              return (0, _paginator["default"])(Session, {
                where: {
                  userId: user.id
                },
                page: page,
                limit: limit
              });

            case 3:
              _yield$paginator = _context.sent;
              data = _yield$paginator.data;
              count = _yield$paginator.count;
              return _context.abrupt("return", response.status(200).json({
                status: 'success',
                message: 'sessions retrieved for user',
                sessions: data,
                count: count,
                page: +page,
                limit: +limit
              }));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getAllSessions(_x, _x2) {
      return _getAllSessions.apply(this, arguments);
    }

    return getAllSessions;
  }(),
  logoutSession: function () {
    var _logoutSession = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response) {
      var user, sessionId, session;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              user = request.user, sessionId = request.params.sessionId;
              _context2.next = 3;
              return Session.findByPk(sessionId);

            case 3:
              session = _context2.sent;

              if (session) {
                _context2.next = 6;
                break;
              }

              throw new _error.NotFoundError("session with ".concat(sessionId, " does not exist"));

            case 6:
              if (!(session.userId !== user.id)) {
                _context2.next = 8;
                break;
              }

              throw (0, _error.ApplicationError)(403, 'operation is forbidden');

            case 8:
              _context2.next = 10;
              return Session.destroy({
                where: {
                  id: sessionId
                }
              });

            case 10:
              return _context2.abrupt("return", response.status(200).json({
                status: 'success',
                message: 'session has been logged-out'
              }));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function logoutSession(_x3, _x4) {
      return _logoutSession.apply(this, arguments);
    }

    return logoutSession;
  }(),
  logoutAllSessions: function () {
    var _logoutAllSessions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response) {
      var user, sessions;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              user = request.user;
              _context3.next = 3;
              return Session.findAll();

            case 3:
              sessions = _context3.sent;

              if (sessions) {
                _context3.next = 6;
                break;
              }

              throw new _error.NotFoundError('no session(s) for this user');

            case 6:
              _context3.next = 8;
              return Session.destroy({
                where: {
                  userId: user.id
                }
              });

            case 8:
              return _context3.abrupt("return", response.status(200).json({
                status: 'success',
                message: 'session history cleared'
              }));

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function logoutAllSessions(_x5, _x6) {
      return _logoutAllSessions.apply(this, arguments);
    }

    return logoutAllSessions;
  }()
};
exports["default"] = _default;