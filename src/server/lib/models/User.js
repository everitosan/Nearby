import mongoose from "mongoose";
let Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
  showId: {type: Number, required: true, unique: true},
  name: { type: String, required: true},
  email: {type: String, unique: true, required: true},
  picture: {type: String, required: true},
  telephone: {type: String},
  requeriments: [ Schema.Types.ObjectId ],
  offers: [ Schema.Types.ObjectId ],
  active: {type: Boolean, default: true}
});


export default mongoose.model("User", UserSchema );