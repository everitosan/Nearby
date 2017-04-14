"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (err, res) {
  if (err) {
    if (err.errors !== undefined) {
      return res.json(err.errors);
    } else {
      return res.json({ "error": err.message });
    }
  }
};