process.env.NODE_ENV = "test";

import mongoose from "mongoose";
import chai from "chai";
import chaiHttp from "chai-http";
import User from "../src/server/lib/models/User";

let server = require("../src/server/lib");
let should = chai.should();


let fId = 0;

chai.use(chaiHttp);

describe("Users", ()=>{

  beforeEach((done)=>{
  
    let abril = new User({
      "showId": 32433724,
      "name": "abril",
      "email": "abril@abril.com",
      "picture":"onePic"
    });
    
    let eve = new User({
      "showId": 3243724,
      "name": "everitosan",
      "email": "roockf@hotmail.com",
      "picture":"dasdasd"
    }); 

    User.remove({}, (err)=>{
      if(err) return done(err);
      abril.save()
        .then((doc)=>{
          fId = doc._id;
          return eve.save();
        })
        .then((doc)=>{
          done();
        })
        .catch((err)=>{
          done(err)
        });
    });
  });

  describe("/GET Users", ()=> {
    it("it should get all the Users", (done) => {
      
      chai.request(server)
        .get("/api/user")
        .then((res)=>{
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].name.should.equal('abril');
          done();
        })
        .catch((err)=>{
          done(err);
        });

    });
  });

  describe("/GET a User", ()=>{
    it("should get a user by it's ID", (done)=>{
      chai.request(server)
        .get("/api/user/"+fId)
        .then((res)=>{
          
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.name.should.equal("abril");
          res.body.email.should.equal("abril@abril.com");
          res.body.picture.should.equal("onePic");

          done();
        })
        .catch((err)=>{
          done(err);
        });
    });
  });

  describe("/POST a User", ()=> {
    it("it should create a User", (done) => {

      let user = {
        "showId": 6666,
        "name": "everitosan",
        "email": "everardo@hotmail.com",
        "picture":"dasdasd"
      };
      chai.request(server)
        .post("/api/user/")
        .send(user)
        .end((err, res) => {
          if(err) done(err);
          let body = res.body;
          res.should.have.status(201);
          body.should.be.a("object");
          body.should.have.property("_id");
          body.should.have.property("offers");
          body.should.have.property("requeriments");
          done();
        })
    
    });
  });

  describe("/PUT a User", ()=>{
    it("it shuld update a user", (done)=>{
      let newData = {
        name: "Abril",
        email: "abril@gmail.com"
      };
      chai.request(server)
        .put("/api/user/"+fId)
        .send(newData)
        .then( (res) => {

          res.should.have.status(200);
          res.should.be.a("object");
          res.body.name.should.equal("Abril");
          res.body.email.should.equal("abril@gmail.com");

          done();

        })
        .catch( (err)=> done(err) );
    });
  });

  describe("/DELETE disable a user",  ()=> {
    it("it should disable a User",  (done)=>{
      chai.request(server)
        .delete("/api/user/"+fId)
        .then((res)=>{
          
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.name.should.equal("abril");
          res.body.active.should.equal(false);
          res.body.picture.should.equal("onePic");
          done();

        })
        .catch((err)=>{
          done(err);
        });
    });
  });

  describe("/DELETE  a user", ()=>{
    it("it should detele a user", (done)=>{

      chai.request(server)
        .delete("/api/user/remove/"+fId)
        .then((res)=>{
        
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("deleted");
          done();
        
        })
        .catch((err)=>{
          done(err);
        });
    });
  });



});