import mongoose from "mongoose";
let Schema = mongoose.Schema;

let Request = new mongoose.Schema({
  article: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, default: Date.now},
  finished: {type: Boolean, default: false},
  offers: [ Schema.Types.ObjectId ],
  active: {type: Boolean, default: true}
});

export default mongoose.model("Request", Request);