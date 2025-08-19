import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  cover: String,
  description: String,
  trailer: String,
  imdbRating: Number,
  personalRating: Number,
  status: String, // "seen" or "wantToSee"
  streaming: [String],
  inCollection: Boolean,
});

export default mongoose.model("Movie", movieSchema);