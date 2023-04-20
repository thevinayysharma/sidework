import mongoose from "mongoose";

// Create Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
