import Models from "../models";
import returnError from "./Error";

const Users = {

  allUsers : function(req, res) {
      
    Models.User.find({})
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
  }

}


export default Users;