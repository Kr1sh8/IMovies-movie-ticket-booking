const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  showtime: { type: String, required: true },
  seats: { type: Number, required: true, min: 1 },
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);