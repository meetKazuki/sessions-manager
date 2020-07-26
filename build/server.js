"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

var DEBUG = (0, _debug["default"])('dev');
var PORT = process.env.NODE_ENV === 'test' ? 6378 : process.env.PORT || 8000;
process.on('uncaughtException', function (error) {
  DEBUG("uncaught exception: ".concat(error.message));
  process.exit(1);
});
process.on('unhandledRejection', function (reason, promise) {
  DEBUG("unhandled rejection at ".concat(promise, ", reason: ").concat(reason));
  process.exit(1);
});

var server = _http["default"].createServer(_app["default"]);

server.listen(PORT, function () {
  DEBUG("server running on http://localhost:".concat(PORT, " in ").concat(process.env.NODE_ENV, " mode.\npress CTRL-C to stop"));
});