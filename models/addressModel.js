const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  houseName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  district: { type: String, require: true },
  street: { type: String, required: true },
  landmark: { type: String, required: true },
  postalCode: { type: String, required: true },
});
const Address = mongoose.model("Address", addressSchema);
module.exports = { Address };
