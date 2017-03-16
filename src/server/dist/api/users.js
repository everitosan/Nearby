"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _Error = require("./Error");

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = {

  allUsers: function allUsers(req, res) {
    // Models.User.find({}, (err, docs)=> {
    //   if(err) return res.sendStatus(500).json(err);
    //   res.json(docs);
    // });

    _models2.default.User.find({}).then(function (docs) {
      res.json(docs);
    }).catch(function (err) {
      res.json(err).sendStatus(500);
    });
  },

  postUser: function postUser(req, res) {
    var _req$body = req.body,
        showId = _req$body.showId,
        name = _req$body.name,
        email = _req$body.email,
        picture = _req$body.picture,
        telephone = _req$body.telephone;

    var userInfo = { showId: showId, name: name, email: email, picture: picture, telephone: telephone };

    var user = new _models2.default.User(userInfo);

    user.save().then(function (doc) {
      res.json(doc);
    }).catch(function (err) {
      (0, _Error2.default)(err, res);
    });

    // user.save((err, user)=>{
    //   ifError(err, res);
    //   res.json(user);
    // });
  },
  getUser: function getUser(req, res) {
    var user = _models2.default.User.findById(req.params.id).then(function (doc) {
      res.json(doc);
    }).catch(function (err) {
      (0, _Error2.default)(err, res);
    });
  },
  putUser: function putUser(req, res) {
    var user = _models2.default.User.findById(req.params.id).then(function (doc) {
      return Object.assign(doc, req.body).save();
    }).then(function (doc) {
      res.json(doc);
    }).catch(function (err) {
      (0, _Error2.default)(err, res);
    });
  }
};

exports.default = Users;