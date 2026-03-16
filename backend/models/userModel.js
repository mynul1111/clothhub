import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^01[3-9]\d{8}$/, "Please enter a valid Bangladeshi phone number"]
  },

  password: {
    type: String,
    required: true,
  },

  cartData: {
    type: Object,
    default: {},
  },

},{minimize: false});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
