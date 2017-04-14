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

describe("Other", ()=>{
	describe("Check endpoint not defined", ()=> {
		it("should get an 404", (done)=> {
			chai.request(server)
			.get("/api/other")
			.end((err, res) => {
			 	res.should.have.status(404);
			 	res.text.should.equal('404');
			 	done();
			});
		});
	})
});