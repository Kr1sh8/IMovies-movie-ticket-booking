const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: String,
  language: String,
  duration: Number,
  poster: String,
  backdrop: String,
  rating: { type: Number, default: 8.5 },
  votes: { type: String, default: "120K" },
  certificate: { type: String, default: "UA 16+" },
  theatres: [
    {
      name: String,
      distance: String,
      transport: String,
      formats: [String],
    },
  ],
  showtimes: [String],
  price: { type: Number, default: 180 },
});

module.exports = mongoose.model("Movie", movieSchema);
