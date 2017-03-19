import Models from "../models";
import returnError from "./error";

const Offer = {
  allOffers: function(req, res) {
    Models.Offer.find({active: true})
      .then((documents)=> {
        res.json(documents);
      })
      .catch((err)=> {
        returnError(err, res);
      });
  },
  getOffer: function(req, res) {
    Models.Offer.findById(req.params.id)
      .then((doc)=>{
        res.json(doc);
      })
      .catch( err => returnError(err, res));    
  },
  putOffer: function(req, res) {
    Models.Offer.findById(req.params.id)
      .then((doc)=>{
        if(doc === null) throw new Error("Offer not found");
        return Object.assign(doc, req.body).save();
      })
      .then((doc)=>{
        res.json(doc);
      })
      .catch((err)=>{
        returnError(err, res);
      });
  },
  disableOffer: function(req, res) {
    Models.Offer.findById(req.params.id)
      .then((doc)=>{
        doc.active = false;
        return doc.save();
      })
      .then((doc)=>{
        res.json(doc);
      })
      .catch( err => returnError(err, res));
  }
};

export default Offer;