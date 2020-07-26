"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _default = {
  logoutSchema: [(0, _expressValidator.param)('sessionId').isUUID().withMessage('invalid ID entered (ID should be UUID)')]
};
exports["default"] = _default;