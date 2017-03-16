"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require("./User");

var _User2 = _interopRequireDefault(_User);

var _Requirement = require("./Requirement");

var _Requirement2 = _interopRequireDefault(_Requirement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var models = {
  User: _User2.default,
  Requirement: _Requirement2.default
};

exports.default = models;