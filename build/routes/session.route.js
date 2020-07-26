"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _asyncWrapper = _interopRequireDefault(require("../middleware/asyncWrapper"));

var _session = _interopRequireDefault(require("../controllers/session.controller"));

var _session2 = _interopRequireDefault(require("../validations/session.validator"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _validator = _interopRequireDefault(require("../middleware/validator"));

var router = (0, _express.Router)();
var verifyToken = _auth["default"].verifyToken;
var getAllSessions = _session["default"].getAllSessions,
    logoutSession = _session["default"].logoutSession,
    logoutAllSessions = _session["default"].logoutAllSessions;
var logoutSchema = _session2["default"].logoutSchema;
router.get('/', verifyToken, (0, _asyncWrapper["default"])(getAllSessions));
router["delete"]('/', verifyToken, (0, _asyncWrapper["default"])(logoutAllSessions));
router["delete"]('/:sessionId', verifyToken, (0, _validator["default"])(logoutSchema), (0, _asyncWrapper["default"])(logoutSession));
var _default = router;
exports["default"] = _default;