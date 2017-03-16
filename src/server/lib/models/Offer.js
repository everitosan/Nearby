import mongoose from "mongoose";
let Schema = mongoose.Schema;

let OfferSchema = new mongoose.Schema({
  price: {type: Number, required: true},
  image: {type: String},
  date: {type: Date, default: Date.now},
  status: {type: Boolean, default: false},
  user: {type: Schema.Types.ObjectId, required: true}
});

export default mongoose.model("Offer", OfferSchema);