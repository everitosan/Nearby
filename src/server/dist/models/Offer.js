"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var OfferSchema = new _mongoose2.default.Schema({
  price: { type: Number, required: true },
  image: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, required: true }
});

exports.default = _mongoose2.default.model("Offer", OfferSchema);