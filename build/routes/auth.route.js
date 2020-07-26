"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

var _auth2 = _interopRequireDefault(require("../validations/auth.validations"));

var _asyncWrapper = _interopRequireDefault(require("../middleware/asyncWrapper"));

var _validator = _interopRequireDefault(require("../middleware/validator"));

var router = (0, _express.Router)();
var signup = _auth["default"].signup,
    signin = _auth["default"].signin;
var signupSchema = _auth2["default"].signupSchema,
    signinSchema = _auth2["default"].signinSchema;
router.post('/signup', (0, _validator["default"])(signupSchema), (0, _asyncWrapper["default"])(signup));
router.post('/signin', (0, _validator["default"])(signinSchema), (0, _asyncWrapper["default"])(signin));
var _default = router;
exports["default"] = _default;