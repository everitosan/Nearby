import Models from "../models";
import returnError from "./error";

const Users = {

  allUsers : function(req, res) {
      
    Models.User.find({active: true})
      .then((docs)=>{
        res.json(docs);
      })
      .catch((err)=> {
        returnError(err, res);
      });
  },

  postUser: function(req, res) {
    let {showId, name, email, picture, telephone} = req.body;
    let userInfo = {showId, name, email, picture, telephone}; 

    let user = new Models.User(userInfo);

    user.save()
      .then((doc)=>{
        res.status(201).json(doc);
      })
      .catch((err)=>{
        returnError(err, res);
      });

  },
  
  getUser: function(req, res) {
    Models.User.findById(req.params.id)
      .then( (doc)=> {
        res.json(doc);
      })
      .catch( (err)=> {
        returnError(err, res);
      }); 
  },
  
  putUser: function(req, res) {
    Models.User.findById(req.params.id)
      .then( (doc)=> {
        if(doc === null) throw new Error("User not found"); 
        return Object.assign(doc, req.body).save()
      })
      .then((doc)=>{
        res.json(doc);
      })
      .catch( (err)=> {
        returnError(err, res);
      }); 
  },
  
  deleteUser: function(req, res) {
    Models.User.findById(req.params.id)
      .then((doc)=>{
        if(doc === null) throw new Error("User not found"); 
        return Models.User.remove(doc);
      })
      .then((doc)=>{
        res.json({"deleted": true});
      })
      .catch((err)=>{
        returnError(err, res);
      });
  },

  disableUser: function(req, res) {
    Models.User.findById(req.params.id)
      .then((doc)=>{
        if(doc === null) throw new Error("User not found"); 
        doc.active = false;

        return doc.save()
      })
      .then((doc)=>{
        res.send(doc);
      })
      .catch((err)=>{
        returnError(err, res);
      });
  },

  deleteRequest: function(req, res) {

    let user;

    Models.User.findById(req.params.id)
      .then((doc)=>{
        if(doc === null) throw new Error("User not found"); 
        let reqPos = doc.requests.findIndex(findDocInArray, req.params.id_request);
        if(reqPos === undefined) throw new Error("Request not found in user");
        doc.requests.splice(reqPos, 1);
        return doc.save()
      })
      .then((doc)=>{
        return  Models.Request.findById(req.params.id_request)
      })
      .then((doc)=>{
        if(doc === null) throw new Error("Request not found");
        return Models.Request.remove(doc);
      })
      .then((doc)=>{
        res.json({"deleted": true});
      })
      .catch((err)=>{
        returnError(err, res);
      });
  },

  createRequest: function(req, res) {
    let user;
    let nReq;

    Models.User.findById(req.params.id)
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

  createOffer: function(req, res) {
    let userD, reqD, offerD;
    Models.User.findById(req.params.id)
      .then((userDoc)=>{
        if(userDoc === null) throw new Error("User not found");
        userD = userDoc;
        return Models.Request.findById(req.params.id_request);
      })
      .then((reqDoc)=>{
        if(reqDoc === null) throw new Error("Request not found in user");
        reqD = reqDoc;
        let {price, image} = req.body;
        let newOffer = new Models.Offer({price, image});
        //console.log(newOffer);
        return newOffer.save();
      })
      .then((offerDoc)=>{
        offerD = offerDoc;
        reqD.offers.push(offerDoc)
        return reqD.save();
      })
      .then((doc)=>{
        userD.offers.push(offerD);
        return userD.save();
      })
      .then((doc)=>{
        res.status(201).json(offerD);
      })
      .catch( err => returnError(err, res));
  },

  deleteOffer: function(req, res){
    let user_offer = {
      user: 0,
      index: 0
    };

    Models.User.findById(req.params.id)
      .then((userDoc)=>{
        if(userDoc ===null) throw new Error("User not found");
        let offerPos = userDoc.offers.findIndex(findDocInArray, req.params.id_offer);
        if(offerPos === undefined) throw new Error("Offer not found in user");
        user_offer.user = userDoc;
        user_offer.index = offerPos;
        return Models.Request.findById(req.params.id_request);
      })
      .then((requestDoc)=>{
        if(requestDoc ===null) throw new Error("Request not found");
        let offerPos = requestDoc.offers.findIndex(findDocInArray, req.params.id_offer);
        if(offerPos === undefined) throw new Error("Offer not found in request");
        requestDoc.offers.splice(offerPos, 1);
        return requestDoc.save(); //delte offer from request
      })
      .then((requestDoc)=>{
        user_offer.user.offers.splice(user_offer.index, 1);
        return user_offer.user.save();
      })
      .then((userDoc)=>{ 
        return Models.Offer.findByIdAndRemove(req.params.id_offer);
      })
      .then((doc)=>{
        res.json({"deleted": true});
      })
      .catch( err => returnError(err, res));
  }

}

function findDocInArray(curReq){
  return curReq == this;
}


export default Users;