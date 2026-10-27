const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  bookingCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  theatre: {
    type: String,
    default: "PVR Cinemas, City Center",
  },
  showDate: {
    type: String,
    required: true,
  },
  showtime: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  seatNumbers: {
    type: [String],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "demo_success", "demo_failed"],
    default: "demo_success",
  },
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "confirmed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for query optimization
bookingSchema.index({ movie: 1, showDate: 1, showtime: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ bookingCode: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
