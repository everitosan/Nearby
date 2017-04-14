import mongoose from "mongoose";
let Schema = mongoose.Schema;

let OfferSchema = new mongoose.Schema({
  price: {type: Number, required: true},
  image: {type: String},
  date: {type: Date, default: Date.now},
  active: {type: Boolean, default: true},
  finished: {type: Boolean, default: false}
});

export default mongoose.model("Offer", OfferSchema);