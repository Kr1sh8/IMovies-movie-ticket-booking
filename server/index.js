const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Movie = require("./Movie");
const Booking = require("./Booking");
const User = require("./User");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "imovies_jwt_super_secret_key_2026";

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

// ==========================================
// 1. AUTHENTICATION ROUTES (JWT & BCRYPT)
// ==========================================

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide Name, Email, and Password." });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password,
      role: role === "admin" ? "admin" : "user",
    });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "Registered successfully!",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration failed. Try again." });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide Email and Password." });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Logged in successfully!",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed. Try again." });
  }
});

// ==========================================
// 2. MOVIE ROUTES (CRUD & SEARCH)
// ==========================================

// Fetch All Movies
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ rating: -1 });
    res.json(movies);
  } catch (error) {
    console.error("Fetch movies error:", error);
    res.status(500).json({ message: "Unable to fetch movies." });
  }
});

// Fetch Single Movie by ID
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

// Admin: Add New Movie
app.post("/api/movies", async (req, res) => {
  try {
    const { title, description, genre, language, duration, poster, backdrop, price, rating, certificate, showtimes, theatres } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Movie title is required." });
    }

    const movie = await Movie.create({
      title,
      description: description || "Experience the thrill in cinema halls.",
      genre: genre || "Action / Drama",
      language: language || "Hindi / English",
      duration: duration || 150,
      poster: poster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
      backdrop: backdrop || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
      price: price || 200,
      rating: rating || 8.5,
      certificate: certificate || "UA 16+",
      showtimes: showtimes || ["10:30 AM", "02:15 PM", "06:00 PM", "09:45 PM"],
      theatres: theatres || [
        {
          name: "PVR: Superplex, Vegas Mall",
          distance: "1.2 km away",
          transport: "5 min by 🛺 E-Rickshaw",
          formats: ["IMAX 3D", "Dolby Atmos 7.1"],
        },
      ],
    });

    res.status(201).json({ message: "Movie added successfully!", movie });
  } catch (error) {
    console.error("Add movie error:", error);
    res.status(500).json({ message: "Unable to add movie." });
  }
});

// Admin: Delete Movie
app.delete("/api/movies/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID." });
    }
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Movie not found." });
    }
    res.json({ message: "Movie deleted successfully!" });
  } catch (error) {
    console.error("Delete movie error:", error);
    res.status(500).json({ message: "Unable to delete movie." });
  }
});

// ==========================================
// 3. BOOKING ROUTES (CREATE, SEATS, CANCEL)
// ==========================================

// Get Already Booked Seats for a specific Show, Date & Theatre
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

// Create New Booking
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

// Fetch User's Bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const { email, phone } = req.query;
    const filter = {};

    if (email) filter.email = email.trim().toLowerCase();
    if (phone) filter.phone = phone.trim();

    if (!email && !phone) {
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

// Booking Cancellation API (Frees up seats)
app.put("/api/bookings/:id/cancel", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking ID." });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({ message: "This booking is already cancelled." });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully! Refund initiated.", booking });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Unable to cancel booking." });
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
