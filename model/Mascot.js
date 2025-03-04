import mongoose from "mongoose";

const mascotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 16,
  },
  number: {
    type: Number,
    required: true,
    min: 0,
    max: 99,
  },
  animal: Boolean,
});

export default mongoose.model("Mascot", mascotSchema);
