import mongoose from "mongoose";
let Schema = mongoose.Schema;

let RequirementSchema = new mongoose.Schema({
  article: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, default: Date.now},
  status: {type: Boolean, default: false},
  offers: [ Schema.Types.ObjectId ]
});

export default mongoose.model("Requirement", RequirementSchema);