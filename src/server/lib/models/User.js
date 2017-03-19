import mongoose from "mongoose";
let Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
  showId: {type: Number, required: true, unique: true},
  name: { type: String, required: true},
  email: {type: String, unique: true, required: true},
  picture: {type: String, required: true},
  telephone: {type: String},
  requests: [ {type: Schema.Types.ObjectId, ref: "Request" }],
  offers: [ {type:Schema.Types.ObjectId, ref:"Offer" }],
  active: {type: Boolean, default: true}
});


export default mongoose.model("User", UserSchema );