process.env.NODE_ENV = "test";

import mongoose from "mongoose";
import chai from "chai";
import chaiHttp from "chai-http";
import User from "../src/server/lib/models/User";
import Request from "../src/server/lib/models/Request";
import Offer from "../src/server/lib/models/Offer";

let server = require("../src/server/lib");
let should = chai.should();


let fId = 0;

chai.use(chaiHttp);

 describe("Offers", ()=>{

  beforeEach((done)=>{
  
    let off1 = new Offer({
      price: 24,
      image: "image.png",
      date: new Date()
    });
    
    let off2 = new Offer({
      price: 74,
      image: "image.png",
      date: new Date(),
      active: false
    });

    Offer.remove({}, (err)=>{
      if(err) return done(err);
      off1.save()
        .then((doc)=>{
          fId = doc._id;
          return off2.save();
        })
        .then((doc)=>{
          done();
        })
        .catch((err)=>{
          done(err)
        });
    });
  });

  describe("/GET all the Offers", ()=> {
    it("it should get all the Offers", (done) => {
      
      chai.request(server)
        .get("/api/offer")
        .then((res)=>{
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].should.have.property("price");
          res.body[0].price.should.equal(24);
          res.body[0].should.have.property("active");
          res.body[0].active.should.equal(true);
          res.body.length.should.equal(1);
          done();
        })
        .catch((err)=>{
          done(err);
        });

    });
  });

  describe("/GET a Offer", ()=>{
    it("should get a offer by it's ID", (done)=>{
      chai.request(server)
        .get("/api/offer/"+fId)
        .then((res)=>{

          res.should.have.status(200);
          res.should.be.a("object");

          res.body.should.have.property("_id");

          res.body.should.have.property("price");
          res.body.price.should.equal(24);

          res.body.should.have.property("image");
          res.body.image.should.equal("image.png");

          res.body.should.have.property("date");
          res.body.should.have.property("active");
          res.body.active.should.equal(true);

          res.body.should.have.property("finished");
          res.body.finished.should.equal(false);

          done();
        })
        .catch((err)=>{
          done(err);
        });
    });
  });

  describe("/PUT an Offer", ()=>{
    it("it shuld update an offer", (done)=>{
      
      let off = {
        image: "my_image.png"
      };

      chai.request(server)
        .put("/api/offer/"+fId)
        .send(off)
        .then( (res) => {

          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("image");
          res.body.image.should.equal("my_image.png");

          done();

        })
        .catch( (err)=> done(err) );
    });
  });

  describe("/DELETE disable an Offer",  ()=> {
    it("it should disable an Offer",  (done)=>{
      chai.request(server)
        .delete("/api/offer/"+fId)
        .then((res)=>{
          
          res.should.have.status(200);
          res.should.be.a("object");

          res.body.should.have.property("price");
          res.body.price.should.equal(24);

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