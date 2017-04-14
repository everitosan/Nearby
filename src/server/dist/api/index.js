"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _users = require("./users");

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/user", _users2.default.allUsers).get("/user/:id", _users2.default.getUser).post("/user", _users2.default.postUser).put("/user/:id", _users2.default.putUser);

router.post("/request", function (req, res) {});

exports.default = router;