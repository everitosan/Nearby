import Models from "../models";
import returnError from "./Error";

const Request = {
  allRequests: function(req, res) {
    Models.Request.find({active: true})
      .populate("offers")
      .exec()
      .then((documents)=>{
        res.send(documents);
      })
      .catch((err)=>{
        returnError(err);
      });
  },
  getRequest: function(req, res) {
    Models.Request.findById(req.params.id)
      .then((doc)=> {
        if(doc === null) throw new Error("Request not found");
        res.json(doc);
      })
      .catch((err)=> {
        returnError(err);
      });
  },

  postRequest: function(req, res) {
    let user;
    let nReq;
    Models.User.findById(req.body.user_id)
      .then((userDoc) => {
        if(userDoc === null) throw new Error("User not found");
        user = userDoc;
        let {article, description} = req.body;
        let requestInfo = {article, description};

        let newRequest = new Models.Request(requestInfo);

        return newRequest.save()
      })
      .then((doc) => {
        nReq = doc;
        user.requests.push(doc);
        return user.save()
      })
      .then((doc)=>{
        res.status(201).json(nReq);
      })
      .catch((err) => {
        returnError(err, res);
      });
  },

  putRequest: function(req, res) {
    Models.Request.findById(req.params.id)
      .then((doc)=>{
        if(doc === null) throw new Error("Request not found");
        return Object.assign(doc, req.body).save();
      })
      .then((doc)=>{
        res.json(doc);
      })
      .catch((err)=>{
        returnError(err, res)
      });
  },

  disableRequest: function(req, res) {
    Models.Request.findById(req.params.id)
      .then((doc)=>{
        if(doc === null) throw new Error("Request not found");
        doc.active = false;
        return doc.save();
      })
      .then((doc)=>{
        res.json(doc);
      })
      .catch((err)=>{
        returnError(err, res)
      });
  }
};

export default Request;
