"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = require("./api");

var _api2 = _interopRequireDefault(_api);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || _config2.default[process.env.NODE_ENV].PORT;
var DB_URI = process.env.MONGODB_URI || _config2.default[process.env.NODE_ENV].DBHost;

_mongoose2.default.connect(DB_URI);
app.use(_express2.default.static("public"));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use("/api", _api2.default);

app.listen(PORT, function () {
  console.log("Server is up and running on http://localhost:" + PORT);
});

exports.default = app;