const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Movie = require("./Movie");
const Booking = require("./Booking");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Dynamic Seat Prices
const SEAT_PRICES = {
  A: 400, // Recliner VIP
  B: 280, // Prime Extra Legroom (Best Seller)
  C: 280, // Prime Extra Legroom (Best Seller)
  D: 180, // Classic Standard
  E: 180, // Classic Standard
  F: 180, // Classic Standard
};

// Root Health Check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "iMovies Cinema API is running smoothly!" });
});

// 1. Fetch All Movies
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ rating: -1 });
    res.json(movies);
  } catch (error) {
    console.error("Fetch movies error:", error);
    res.status(500).json({ message: "Unable to fetch movies." });
  }
});

// 2. Fetch Single Movie by ID
app.get("/api/movies/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID." });
    }
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }
    res.json(movie);
  } catch (error) {
    console.error("Fetch movie error:", error);
    res.status(500).json({ message: "Unable to fetch movie." });
  }
});

// 3. Get Already Booked Seats for a specific Show, Date & Theatre
app.get("/api/booked-seats", async (req, res) => {
  try {
    const { movieId, showDate, showtime, theatre } = req.query;
    if (!movieId || !showDate || !showtime) {
      return res.json([]);
    }

    const query = {
      movie: movieId,
      showDate,
      showtime,
      bookingStatus: "confirmed",
    };
    if (theatre) query.theatre = theatre;

    const bookings = await Booking.find(query).select("seatNumbers");
    const bookedSeats = bookings.flatMap((b) => b.seatNumbers);
    res.json(bookedSeats);
  } catch (error) {
    console.error("Fetch booked seats error:", error);
    res.status(500).json({ message: "Error fetching seat availability." });
  }
});

// 4. Create New Booking
app.post("/api/bookings", async (req, res) => {
  try {
    const {
      movie,
      name,
      phone,
      email,
      theatre,
      showDate,
      showtime,
      seatNumbers,
    } = req.body;

    if (
      !movie ||
      !name ||
      !name.trim() ||
      !phone ||
      !phone.trim() ||
      !email ||
      !email.trim() ||
      !showDate ||
      !showtime ||
      !Array.isArray(seatNumbers) ||
      seatNumbers.length === 0
    ) {
      return res.status(400).json({
        message: "Please fill in all details (Name, Phone, Email, Showtime & Seats).",
      });
    }

    if (!mongoose.isValidObjectId(movie)) {
      return res.status(400).json({ message: "Invalid movie ID." });
    }

    // Check movie existence
    const selectedMovie = await Movie.findById(movie);
    if (!selectedMovie) {
      return res.status(404).json({ message: "Selected movie not found." });
    }

    // Check collision for already booked seats
    const existingBooking = await Booking.findOne({
      movie,
      showDate,
      showtime,
      theatre: theatre || "PVR Cinemas, City Center",
      bookingStatus: "confirmed",
      seatNumbers: { $in: seatNumbers },
    });

    if (existingBooking) {
      return res.status(409).json({
        message: "One or more of your chosen seats were just booked. Please pick other seats.",
      });
    }

    // Calculate verified total
    const totalPrice = seatNumbers.reduce((sum, seat) => {
      const row = seat.charAt(0).toUpperCase();
      return sum + (SEAT_PRICES[row] || 200);
    }, 0);

    // Unique Booking Code e.g. IMV-74921
    const bookingCode = "IMV-" + Math.floor(100000 + Math.random() * 900000);

    const booking = await Booking.create({
      movie,
      bookingCode,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      theatre: theatre || "PVR Cinemas, City Center",
      showDate,
      showtime,
      seats: seatNumbers.length,
      seatNumbers,
      totalPrice,
      paymentStatus: "demo_success",
      bookingStatus: "confirmed",
    });

    await booking.populate("movie");

    return res.status(201).json({
      message: "Ticket Booked Successfully!",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({
      message: "Unable to process booking. Please try again.",
    });
  }
});

// 5. Fetch User's Bookings by Email or Phone
app.get("/api/bookings", async (req, res) => {
  try {
    const { email, phone } = req.query;
    const filter = {};

    if (email) filter.email = email.trim().toLowerCase();
    if (phone) filter.phone = phone.trim();

    if (!email && !phone) {
      // Return recent 15 bookings if no filter
      const recent = await Booking.find().populate("movie").sort({ createdAt: -1 }).limit(15);
      return res.json(recent);
    }

    const bookings = await Booking.find(filter)
      .populate("movie")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({ message: "Unable to fetch bookings." });
  }
});

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in server/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully to Atlas!");

    app.listen(PORT, () => {
      console.log(`🎬 iMovies Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
