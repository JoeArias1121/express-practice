import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001
    },
    Editor: Number,
    Admin: Number
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String
});
// mongoose will look for the plural, lowercased version of the model name ("User" -> "users") in the database
export default mongoose.model("User", userSchema);