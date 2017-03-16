"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new _mongoose2.default.Schema({
  showId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  picture: { type: String, required: true },
  telephone: { type: String },
  requeriments: [Schema.Types.ObjectId],
  offers: [Schema.Types.ObjectId]
});

exports.default = _mongoose2.default.model("User", UserSchema);