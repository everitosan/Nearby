"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var RequirementSchema = new _mongoose2.default.Schema({
  article: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: Boolean, default: false },
  offers: [Schema.Types.ObjectId]
});

exports.default = _mongoose2.default.model("Requirement", RequirementSchema);