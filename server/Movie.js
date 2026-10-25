const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: String,
  language: String,
  duration: Number,
  poster: String,
  showtimes: [String],
  price: { type: Number, default: 200 },
});

module.exports = mongoose.model("Movie", movieSchema);