const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Movie = require("./Movie");
const Booking = require("./Booking");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("IMovies API chal raha hai");
});

app.get("/api/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.get("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: "Invalid id" });
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const { movie, name, email, showtime, seats } = req.body;
    const m = await Movie.findById(movie);
    if (!m) return res.status(404).json({ message: "Movie not found" });
    const booking = await Booking.create({
      movie, name, email, showtime, seats,
      totalPrice: m.price * seats,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/bookings", async (req, res) => {
  const { email } = req.query;
  const bookings = await Booking.find({ email }).populate("movie");
  res.json(bookings);
});

app.get("/api/seed", async (req, res) => {
  await Movie.deleteMany();
  await Movie.insertMany([
    { title: "Inception", description: "A thief enters dreams to steal secrets.", genre: "Sci-Fi", language: "English", duration: 148, poster: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg", showtimes: ["10:00 AM", "2:00 PM", "7:00 PM"], price: 250 },
    { title: "3 Idiots", description: "Three friends and their journey through engineering college.", genre: "Comedy", language: "Hindi", duration: 170, poster: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg", showtimes: ["11:00 AM", "3:00 PM", "8:00 PM"], price: 200 },
    { title: "Interstellar", description: "Explorers travel through a wormhole to save humanity.", genre: "Sci-Fi", language: "English", duration: 169, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", showtimes: ["10:30 AM", "4:00 PM", "9:00 PM"], price: 300 },
  ]);
  res.send("Movies added");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));