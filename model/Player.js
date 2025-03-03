import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Player", playerSchema);