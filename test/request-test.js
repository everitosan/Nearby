process.env.NODE_ENV = "test";

import mongoose from "mongoose";
import chai from "chai";
import chaiHttp from "chai-http";
import Request from "../src/server/lib/models/Request";
import User from "../src/server/lib/models/User";

let server = require("../src/server/lib");
let should = chai.should();


let fId = 0;

chai.use(chaiHttp);

describe("Requests", ()=>{

  beforeEach((done)=>{
  
    let r1 = new Request({
      article: "Bicicleta",
      description: "Necesito una bicileta grande y azul."
    });
    
    let r2 = new Request({
      article: "Tasa de peltre",
      description: "Necesito una tasa de peltre pequeña",
      active: false
    });

    Request.remove({}, (err)=>{
      if(err) return done(err);
      r1.save()
        .then((doc)=>{
          fId = doc._id;
          return r2.save();
        })
        .then((doc)=>{
          done();
        })
        .catch((err)=>{
          done(err)
        });
    });
  });

  describe("/GET Requests", ()=> {
    it("it should get all the Requests", (done) => {
      
      chai.request(server)
        .get("/api/request")
        .then((res)=>{
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].article.should.equal("Bicicleta");
          res.body.length.should.equal(1);
          done();
        })
        .catch((err)=>{
          done(err);
        });

    });
  });

  describe("/GET a Request", ()=>{
    it("should get a request by it's ID", (done)=>{
      chai.request(server)
        .get("/api/request/"+fId)
        .then((res)=>{
          
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("article");
          res.body.article.should.equal("Bicicleta");

          done();
        })
        .catch((err)=>{
          done(err);
        });
    });
  });

  describe("/POST a Request", ()=> {
    it("it should create a Request and attach it to a user", (done) => {

      let abril = new User({
        "showId": 32430724,
        "name": "abril",
        "email": "abril@go.com",
        "picture":"onePic",
        "coordinates": "19.3345687,-99.1068818"
      });

      abril.save()
        .then((doc)=>{
          let UID = doc._id;

          let mRequest = {
            article: "Tennis",
            description: "Necesito unos tennis nuevos del número 7.5",
            user_id: UID
          };

          chai.request(server)
            .post("/api/request/")
            .send(mRequest)
            .end((err, res) => {
              if(err) done(err);
              let body = res.body;
              res.should.have.status(201);
              body.should.be.a("object");
              body.should.have.property("_id");
              body.should.have.property("finished");
              body.finished.should.equal(false);
              done();
            })

        })
        .catch((err)=>{
          done(err);
        });

      
    
    });
  });

  describe("/PUT a Request", ()=>{
    it("it shuld update a request", (done)=>{
      
      let newData = {
        article: "Bicicleta2",
      };

      chai.request(server)
        .put("/api/request/"+fId)
        .send(newData)
        .then( (res) => {

          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("article");
          res.body.article.should.equal("Bicicleta2");

          done();

        })
        .catch( (err)=> done(err) );
    });
  });


  describe("/DELETE disable a request",  ()=> {
    it("it should disable a Request",  (done)=>{
      chai.request(server)
        .delete("/api/request/"+fId)
        .then((res)=>{
          
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("active");
          res.body.active.should.equal(false);
          done();

        })
        .catch((err)=>{
          done(err);
        });
    });
  });


});