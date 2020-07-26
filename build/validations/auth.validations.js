"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _default = {
  signupSchema: [(0, _expressValidator.check)('fullName').not().isEmpty().withMessage('Your fullname is required'), (0, _expressValidator.check)('username').not().isEmpty().withMessage('Username is required'), (0, _expressValidator.check)('email').not().isEmpty().withMessage('Email address is required').isEmail().withMessage('Enter a valid email address').normalizeEmail(), (0, _expressValidator.check)('password').not().isEmpty().withMessage('Password is required')],
  signinSchema: [(0, _expressValidator.check)('email').not().isEmpty().withMessage('Username is required'), (0, _expressValidator.check)('password').not().isEmpty().withMessage('Password is required')]
};
exports["default"] = _default;