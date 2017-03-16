"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "dev": {
    "PORT": 3000,
    "DBHost": "mongodb://localhost/nearby"
  },
  "test": {
    "PORT": 3001,
    "DBHost": "mongodb://localhost/nearby-test"
  },
  "deploy": {
    "PORT": 3000,
    "DBHost": "mongodb://localhost/nearby"
  }
};