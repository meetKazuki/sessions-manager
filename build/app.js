"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _express = _interopRequireDefault(require("express"));

var _expressIp = _interopRequireDefault(require("express-ip"));

var _expressFingerprint = _interopRequireDefault(require("express-fingerprint"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _errorHandler = _interopRequireDefault(require("./middleware/errorHandler"));

(0, _dotenv.config)();
var app = (0, _express["default"])();
app.use((0, _expressIp["default"])().getIpInfoMiddleware);
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _expressFingerprint["default"])());

if (['development', 'staging', 'production'].includes(process.env.NODE_ENV)) {
  app.use((0, _morgan["default"])('dev'));
}

app.use(_routes["default"]);
app.get('/', function (request, response) {
  response.status(200).json({
    status: 'success',
    message: 'welcome to "Sessions Manager"'
  });
});
app.all('*', function (_, response) {
  response.status(404).json({
    status: 'error',
    error: 'endpoint/resource not found'
  });
});
app.use(_errorHandler["default"]);
var _default = app;
exports["default"] = _default;