import mongoose from "mongoose";
let Schema = mongoose.Schema;

let Request = new mongoose.Schema({
  article: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, default: Date.now},
  finished: {type: Boolean, default: false},
  active: {type: Boolean, default: true},
  offers: [ Schema.Types.ObjectId ],
});

export default mongoose.model("Request", Request);