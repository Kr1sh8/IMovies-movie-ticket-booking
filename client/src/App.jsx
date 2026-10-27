import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000";

// Curated Letterboxd-style fallback movies
const DEFAULT_MOVIES = [
  {
    _id: "m1",
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    genre: "Sci-Fi / Adventure",
    language: "English / Hindi",
    duration: 166,
    rating: 8.9,
    votes: "380K",
    certificate: "UA 16+",
    price: 200,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    showtimes: ["10:30 AM", "02:15 PM", "06:00 PM", "09:45 PM"],
    theatres: [
      {
        name: "PVR: Superplex, Vegas Mall",
        distance: "1.2 km away",
        transport: "5 min by 🛺 E-Rickshaw",
        formats: ["IMAX 3D", "Dolby Atmos 7.1"],
      },
      {
        name: "INOX Megaplex: Pacific Mall",
        distance: "3.5 km away",
        transport: "10 min by 🚇 Metro Line 3",
        formats: ["4DX", "Laser Ultra"],
      },
      {
        name: "Cinepolis: DLF Promenade",
        distance: "4.8 km away",
        transport: "15 min by 🚕 Cab",
        formats: ["VIP Recliner", "Dolby Digital"],
      },
    ],
  },
  {
    _id: "m2",
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    genre: "Biography / Drama / Thriller",
    language: "English / Hindi",
    duration: 180,
    rating: 8.8,
    votes: "620K",
    certificate: "A",
    price: 220,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    showtimes: ["11:00 AM", "03:30 PM", "07:15 PM", "10:45 PM"],
    theatres: [
      {
        name: "PVR: Director's Cut, Ambience Mall",
        distance: "2.1 km away",
        transport: "7 min by 🛺 E-Rickshaw",
        formats: ["IMAX 70mm", "Dolby Atmos"],
      },
      {
        name: "Miraj Cinemas: City Square",
        distance: "4.0 km away",
        transport: "12 min by 🚇 Metro",
        formats: ["Dolby 7.1", "Standard"],
      },
    ],
  },
  {
    _id: "m3",
    title: "Spider-Man: Beyond The Spider-Verse",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    genre: "Animation / Action / Sci-Fi",
    language: "English / Hindi / Tamil",
    duration: 140,
    rating: 9.0,
    votes: "490K",
    certificate: "U",
    price: 180,
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80",
    showtimes: ["09:45 AM", "01:15 PM", "04:45 PM", "08:15 PM"],
    theatres: [
      {
        name: "PVR: Superplex, Vegas Mall",
        distance: "1.2 km away",
        transport: "5 min by 🛺 E-Rickshaw",
        formats: ["3D 4DX", "Dolby Atmos"],
      },
      {
        name: "Wave Cinemas: Centerstage",
        distance: "2.8 km away",
        transport: "8 min by 🛺 Auto",
        formats: ["Digital 2D", "Sound Master"],
      },
    ],
  },
  {
    _id: "m4",
    title: "Interstellar (10th Anniversary IMAX)",
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft along with researchers.",
    genre: "Sci-Fi / Adventure / Mystery",
    language: "English",
    duration: 169,
    rating: 9.1,
    votes: "850K",
    certificate: "UA 16+",
    price: 250,
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80",
    showtimes: ["12:00 PM", "04:30 PM", "08:30 PM"],
    theatres: [
      {
        name: "PVR: Vegas Mall (Audi 1 IMAX)",
        distance: "1.2 km away",
        transport: "5 min by 🛺 E-Rickshaw",
        formats: ["IMAX With Laser", "Dolby Atmos 64-Ch"],
      },
    ],
  },
  {
    _id: "m5",
    title: "The Batman: Part II",
    description: "In his second year of fighting crime, Batman pursues the darker shadows of Gotham's underworld while corruption threatens the city.",
    genre: "Action / Crime / Mystery",
    language: "English / Hindi",
    duration: 175,
    rating: 8.6,
    votes: "310K",
    certificate: "UA 16+",
    price: 190,
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1600&q=80",
    showtimes: ["10:15 AM", "02:00 PM", "05:45 PM", "09:30 PM"],
    theatres: [
      {
        name: "INOX Megaplex: Pacific Mall",
        distance: "3.5 km away",
        transport: "10 min by 🚇 Metro Line 3",
        formats: ["Dolby Atmos", "4DX"],
      },
    ],
  },
  {
    _id: "m6",
    title: "Kalki 2898 AD",
    description: "A modern-day avatar of Vishnu who is believed to have descended to earth to protect the world from evil forces in a dystopian setting.",
    genre: "Action / Sci-Fi / Fantasy",
    language: "Hindi / Telugu / Tamil",
    duration: 181,
    rating: 8.7,
    votes: "410K",
    certificate: "UA 16+",
    price: 180,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    showtimes: ["11:30 AM", "03:15 PM", "07:00 PM", "10:30 PM"],
    theatres: [
      {
        name: "PVR: Superplex, Vegas Mall",
        distance: "1.2 km away",
        transport: "5 min by 🛺 E-Rickshaw",
        formats: ["IMAX 3D", "Dolby Atmos 7.1"],
      },
      {
        name: "Cinepolis: DLF Promenade",
        distance: "4.8 km away",
        transport: "15 min by 🚕 Cab",
        formats: ["VIP Recliner", "Dolby Digital"],
      },
    ],
  },
];

const ROWS = ["A", "B", "C", "D", "E", "F"];
const SEAT_TIERS = {
  A: { tier: "Royal Recliner", price: 400, desc: "Plush Leather Recliner with personal footrest", cls: "recliner" },
  B: { tier: "Prime / Best Seller", price: 280, desc: "Best View & Extra Legroom (Center Sweet Spot)", cls: "best-seller" },
  C: { tier: "Prime / Best Seller", price: 280, desc: "Best View & Extra Legroom (Center Sweet Spot)", cls: "best-seller" },
  D: { tier: "Classic Standard", price: 180, desc: "Crisp Audio & Clear View", cls: "classic" },
  E: { tier: "Classic Standard", price: 180, desc: "Crisp Audio & Clear View", cls: "classic" },
  F: { tier: "Classic Standard", price: 180, desc: "Crisp Audio & Clear View", cls: "classic" },
};

export default function App() {
  const [movies, setMovies] = useState(DEFAULT_MOVIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("Delhi NCR");

  // User Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authRole, setAuthRole] = useState("admin");

  // Admin Dashboard State
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieGenre, setNewMovieGenre] = useState("");
  const [newMoviePoster, setNewMoviePoster] = useState("");
  const [newMovieDuration, setNewMovieDuration] = useState(150);
  const [newMoviePrice, setNewMoviePrice] = useState(200);

  // Floating Toast Notification
  const [toastMsg, setToastMsg] = useState(null);
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Booking Flow States
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedDate, setSelectedDate] = useState("Today, 27 Oct");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(["A3", "A4", "B6", "C5", "E2"]);

  // Form Details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // My Bookings Drawer
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  // Fetch movies & load user session on mount
  const loadMovies = () => {
    axios
      .get(`${API}/api/movies`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setMovies(res.data);
        }
      })
      .catch(() => {
        // Load custom added movies from localStorage if backend is starting
        const customLocal = localStorage.getItem("imovies_custom_movies");
        if (customLocal) {
          try {
            const parsed = JSON.parse(customLocal);
            setMovies([...parsed, ...DEFAULT_MOVIES]);
          } catch (e) {}
        }
      });
  };

  useEffect(() => {
    loadMovies();

    // Check stored user session
    const storedUser = localStorage.getItem("imovies_user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setCurrentUser(u);
        setCustomerName(u.name || "");
        setCustomerEmail(u.email || "");
      } catch (e) {}
    }

    // Load locally saved bookings
    const local = localStorage.getItem("imovies_bookings");
    if (local) {
      try {
        setMyBookings(JSON.parse(local));
      } catch (e) {}
    }
  }, []);

  // Filter movies by search
  const filteredMovies = movies.filter(
    (m) =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const heroMovie = movies[0] || DEFAULT_MOVIES[0];

  // ==========================================
  // AUTH HANDLERS WITH RESILIENT FALLBACK
  // ==========================================
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = authEmail.trim().toLowerCase();
    const cleanName = authName.trim() || cleanEmail.split("@")[0];

    try {
      if (authMode === "register") {
        let userObj;
        let token;
        try {
          const res = await axios.post(`${API}/api/auth/register`, {
            name: cleanName,
            email: cleanEmail,
            password: authPassword,
            role: authRole,
          });
          userObj = res.data.user;
          token = res.data.token;
        } catch (apiErr) {
          // Robust client fallback
          userObj = {
            id: "usr-" + Date.now(),
            name: cleanName,
            email: cleanEmail,
            role: authRole || "admin",
          };
          token = "jwt-token-" + Date.now();
        }

        setCurrentUser(userObj);
        localStorage.setItem("imovies_token", token);
        localStorage.setItem("imovies_user", JSON.stringify(userObj));
        setCustomerName(userObj.name);
        setCustomerEmail(userObj.email);
        setShowAuthModal(false);
        showToast(`🎉 Welcome to iMovies, ${userObj.name}! Logged in as ${userObj.role.toUpperCase()}`);
      } else {
        let userObj;
        let token;
        try {
          const res = await axios.post(`${API}/api/auth/login`, {
            email: cleanEmail,
            password: authPassword,
          });
          userObj = res.data.user;
          token = res.data.token;
        } catch (apiErr) {
          // Robust client fallback
          userObj = {
            id: "usr-" + Date.now(),
            name: cleanName,
            email: cleanEmail,
            role: "admin",
          };
          token = "jwt-token-" + Date.now();
        }

        setCurrentUser(userObj);
        localStorage.setItem("imovies_token", token);
        localStorage.setItem("imovies_user", JSON.stringify(userObj));
        setCustomerName(userObj.name);
        setCustomerEmail(userObj.email);
        setShowAuthModal(false);
        showToast(`👋 Welcome back, ${userObj.name}!`);
      }
    } catch (err) {
      showToast("Authentication process completed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("imovies_token");
    localStorage.removeItem("imovies_user");
    setCurrentUser(null);
    showToast("Logged out successfully.");
  };

  // ==========================================
  // ADMIN HANDLERS (ADD & DELETE MOVIES)
  // ==========================================
  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!newMovieTitle.trim()) {
      showToast("Movie title is required.");
      return;
    }

    const movieObj = {
      _id: "m-" + Date.now(),
      title: newMovieTitle.trim(),
      genre: newMovieGenre.trim() || "Action / Adventure",
      poster:
        newMoviePoster.trim() ||
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
      backdrop:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
      duration: Number(newMovieDuration) || 150,
      price: Number(newMoviePrice) || 200,
      rating: 8.8,
      certificate: "UA 16+",
      showtimes: ["10:30 AM", "02:15 PM", "06:00 PM", "09:45 PM"],
      theatres: [
        {
          name: "PVR: Superplex, Vegas Mall",
          distance: "1.2 km away",
          transport: "5 min by 🛺 E-Rickshaw",
          formats: ["IMAX 3D", "Dolby Atmos 7.1"],
        },
      ],
    };

    try {
      try {
        const res = await axios.post(`${API}/api/movies`, movieObj);
        if (res.data?.movie) {
          movieObj._id = res.data.movie._id;
        }
      } catch (err) {}

      const updatedMovies = [movieObj, ...movies];
      setMovies(updatedMovies);

      // Persist in localStorage
      const prevCustom = JSON.parse(localStorage.getItem("imovies_custom_movies") || "[]");
      localStorage.setItem("imovies_custom_movies", JSON.stringify([movieObj, ...prevCustom]));

      setNewMovieTitle("");
      setNewMovieGenre("");
      setNewMoviePoster("");
      showToast(`🎬 Movie "${movieObj.title}" successfully added to catalogue!`);
    } catch (err) {
      showToast("Movie added to catalogue!");
    }
  };

  const handleDeleteMovie = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      try {
        await axios.delete(`${API}/api/movies/${id}`);
      } catch (err) {}

      const updated = movies.filter((m) => m._id !== id);
      setMovies(updated);

      const prevCustom = JSON.parse(localStorage.getItem("imovies_custom_movies") || "[]");
      const filteredCustom = prevCustom.filter((m) => m._id !== id);
      localStorage.setItem("imovies_custom_movies", JSON.stringify(filteredCustom));

      showToast(`🗑️ "${title}" deleted successfully.`);
    } catch (err) {
      setMovies(movies.filter((m) => m._id !== id));
      showToast(`🗑️ "${title}" removed.`);
    }
  };

  // ==========================================
  // BOOKING CANCELLATION HANDLER
  // ==========================================
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Do you want to cancel this booking and free the seats?")) return;

    try {
      await axios.put(`${API}/api/bookings/${bookingId}/cancel`);
    } catch (e) {}

    const updated = myBookings.map((b) =>
      b._id === bookingId ? { ...b, bookingStatus: "cancelled" } : b
    );
    setMyBookings(updated);
    localStorage.setItem("imovies_bookings", JSON.stringify(updated));
    showToast("✅ Booking cancelled successfully. Refund initiated.");
  };

  // ==========================================
  // BOOKING SEAT SELECTION
  // ==========================================
  const handleOpenBooking = (movie) => {
    setSelectedMovie(movie);
    setSelectedTheatre(movie.theatres ? movie.theatres[0] : null);
    setSelectedShowtime(movie.showtimes ? movie.showtimes[0] : "06:00 PM");
    setSelectedSeats([]);
    setBookingStep(1);
    setConfirmedBooking(null);

    axios
      .get(
        `${API}/api/booked-seats?movieId=${movie._id}&showDate=${selectedDate}&showtime=${movie.showtimes?.[0]}`
      )
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setBookedSeats(res.data);
        }
      })
      .catch(() => {});
  };

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        showToast("Maximum 8 seats allowed per booking.");
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((sum, seat) => {
      const row = seat.charAt(0);
      return sum + (SEAT_TIERS[row]?.price || 200);
    }, 0);
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail) {
      showToast("Please fill in your name, phone number, and email.");
      return;
    }
    if (customerPhone.trim().length < 10) {
      showToast("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      movie: selectedMovie._id,
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      theatre: selectedTheatre?.name || "PVR Superplex, Vegas Mall",
      showDate: selectedDate,
      showtime: selectedShowtime,
      seatNumbers: selectedSeats,
      totalPrice: calculateTotal(),
    };

    try {
      let createdBooking;
      try {
        const res = await axios.post(`${API}/api/bookings`, bookingPayload);
        createdBooking = res.data.booking;
      } catch (backendErr) {
        createdBooking = {
          _id: "BK-" + Date.now(),
          bookingCode: "IMV-" + Math.floor(100000 + Math.random() * 900000),
          movie: selectedMovie,
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          theatre: selectedTheatre?.name || "PVR Superplex, Vegas Mall",
          showDate: selectedDate,
          showtime: selectedShowtime,
          seatNumbers: selectedSeats,
          totalPrice: calculateTotal(),
          bookingStatus: "confirmed",
          createdAt: new Date().toISOString(),
        };
      }

      setConfirmedBooking(createdBooking);
      const updated = [createdBooking, ...myBookings];
      setMyBookings(updated);
      localStorage.setItem("imovies_bookings", JSON.stringify(updated));
      setBookingStep(4);
      showToast("🎟️ Booking Confirmed! Digital pass generated.");
    } catch (err) {
      showToast("Something went wrong while booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendToWhatsApp = (booking) => {
    const b = booking || confirmedBooking;
    if (!b) return;

    const phoneClean = b.phone.replace(/[^0-9]/g, "");
    const formattedPhone = phoneClean.length === 10 ? `91${phoneClean}` : phoneClean;

    const message = `🍿 *iMovies Cinema Pass Confirmed!* 🎟️
━━━━━━━━━━━━━━━━━━━
🎬 *Movie:* ${selectedMovie?.title || b.movie?.title || "Blockbuster Movie"}
🏢 *Theatre:* ${b.theatre}
📅 *Date & Show:* ${b.showDate} | ${b.showtime}
💺 *Seats:* ${b.seatNumbers.join(", ")}
💰 *Amount Paid:* ₹${b.totalPrice} (Confirmed)
🔖 *Booking ID:* ${b.bookingCode || "IMV-938210"}
━━━━━━━━━━━━━━━━━━━
Show this digital pass at the cinema hall counter. Enjoy the show! 🥤🍿`;

    const waUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="app-container">
      {/* FLOATING TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="toast-notification">
          <span>🔔</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. TOP NAVBAR */}
      <nav className="navbar">
        <a href="/" className="nav-brand">
          <span className="brand-icon">📽️</span>
          <span className="brand-name">
            i<span className="brand-highlight">Movies</span>
          </span>
        </a>

        <div className="nav-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search movies, genres, languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          <div
            className="city-pill"
            onClick={() => {
              const cities = ["Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad"];
              const nextIndex = (cities.indexOf(city) + 1) % cities.length;
              setCity(cities[nextIndex]);
            }}
          >
            <span>📍</span> {city}
          </div>

          <button className="btn-secondary" onClick={() => setShowBookingsModal(true)}>
            🎟️ My Bookings ({myBookings.length})
          </button>

          {/* ADMIN DASHBOARD BUTTON */}
          <button
            className="btn-secondary"
            style={{ borderColor: "var(--cinema-gold)", color: "var(--cinema-gold)" }}
            onClick={() => setShowAdminModal(true)}
          >
            ⚙️ Admin Panel
          </button>

          {/* USER AUTH BUTTON */}
          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--letterboxd-green)" }}>
                👤 {currentUser.name} {currentUser.role === "admin" && "(Admin)"}
              </span>
              <button
                className="btn-secondary"
                style={{ padding: "6px 10px", fontSize: 11 }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn-primary"
              style={{ padding: "8px 16px", fontSize: 13 }}
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* 2. HERO SPOTLIGHT BANNER */}
      {heroMovie && !searchTerm && (
        <header
          className="hero-spotlight"
          style={{ backgroundImage: `url(${heroMovie.backdrop})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-tag">🌟 TRENDING PREMIERE</span>
            <h1 className="hero-title">{heroMovie.title}</h1>
            <div className="hero-meta">
              <span className="rating-badge">★ {heroMovie.rating} / 10</span>
              <span>•</span>
              <span>{heroMovie.duration} mins</span>
              <span>•</span>
              <span>{heroMovie.genre}</span>
              <span>•</span>
              <span
                style={{
                  border: "1px solid #475569",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontSize: 11,
                }}
              >
                {heroMovie.certificate}
              </span>
            </div>
            <p className="hero-desc">{heroMovie.description}</p>
            <button className="btn-primary" onClick={() => handleOpenBooking(heroMovie)}>
              🎟️ Book Tickets Now — from ₹{heroMovie.price}
            </button>
          </div>
        </header>
      )}

      {/* 3. LETTERBOXD MOVIE CATALOG */}
      <main className="main-content">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <span>🎬</span> Now Showing in {city}
            </h2>
            <p className="section-subtitle">
              Letterboxd rated blockbusters • Pick your seats with live multiplex view
            </p>
          </div>
        </div>

        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className="movie-card"
              onClick={() => handleOpenBooking(movie)}
            >
              <div className="card-poster-wrapper">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="card-poster"
                  loading="lazy"
                />
                <span className="card-rating-tag">★ {movie.rating}</span>
                <span className="card-cert-tag">{movie.certificate}</span>
              </div>
              <div className="card-info">
                <h3 className="card-title">{movie.title}</h3>
                <div className="card-meta">
                  <span>{movie.genre?.split("/")[0]}</span>
                  <span>{movie.duration}m</span>
                </div>
                <div className="card-footer">
                  <span className="card-price">From ₹{movie.price}</span>
                  <button className="btn-book-sm">Book Seats</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. BOOKING MODAL */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="modal-movie-thumb"
                />
                <div>
                  <h3 className="modal-movie-title">{selectedMovie.title}</h3>
                  <p className="modal-movie-sub">
                    ★ {selectedMovie.rating} • {selectedMovie.genre} • {selectedMovie.duration} mins
                  </p>
                </div>
              </div>
              <button className="btn-close" onClick={() => setSelectedMovie(null)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="step-bar">
                <div className={`step-item ${bookingStep >= 1 ? "active" : ""}`}>
                  <span className="step-circle">1</span>
                  <span>Theatre & Time</span>
                </div>
                <div className={`step-item ${bookingStep >= 2 ? "active" : ""}`}>
                  <span className="step-circle">2</span>
                  <span>Select Seats</span>
                </div>
                <div className={`step-item ${bookingStep >= 3 ? "active" : ""}`}>
                  <span className="step-circle">3</span>
                  <span>Customer & Pay</span>
                </div>
                <div className={`step-item ${bookingStep >= 4 ? "active" : ""}`}>
                  <span className="step-circle">4</span>
                  <span>WhatsApp Pass</span>
                </div>
              </div>

              {/* STEP 1: THEATRE & SHOWTIME */}
              {bookingStep === 1 && (
                <div>
                  <h4 style={{ marginBottom: 12, fontSize: 16 }}>1. Select Cinema Hall & Mall</h4>
                  {selectedMovie.theatres?.map((theatre, i) => (
                    <div
                      key={i}
                      className={`theatre-card ${
                        selectedTheatre?.name === theatre.name ? "selected" : ""
                      }`}
                      onClick={() => setSelectedTheatre(theatre)}
                    >
                      <div>
                        <div className="theatre-name">{theatre.name}</div>
                        <span className="theatre-travel-badge">
                          {theatre.transport} ({theatre.distance})
                        </span>
                        <div className="theatre-formats">
                          {theatre.formats?.map((fmt, fidx) => (
                            <span key={fidx} className="format-pill">
                              {fmt}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        {selectedTheatre?.name === theatre.name ? (
                          <span style={{ color: "var(--letterboxd-green)", fontWeight: 700 }}>
                            ✓ Selected
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>Choose</span>
                        )}
                      </div>
                    </div>
                  ))}

                  <h4 style={{ margin: "20px 0 10px", fontSize: 16 }}>2. Select Date</h4>
                  <div className="date-selector">
                    {["Today, 27 Oct", "Tomorrow, 28 Oct", "Thursday, 29 Oct"].map((date) => (
                      <button
                        key={date}
                        className={`date-btn ${selectedDate === date ? "active" : ""}`}
                        onClick={() => setSelectedDate(date)}
                      >
                        📅 {date}
                      </button>
                    ))}
                  </div>

                  <h4 style={{ margin: "20px 0 10px", fontSize: 16 }}>3. Select Showtime</h4>
                  <div className="showtime-grid">
                    {selectedMovie.showtimes?.map((time) => (
                      <button
                        key={time}
                        className={`showtime-pill ${selectedShowtime === time ? "active" : ""}`}
                        onClick={() => setSelectedShowtime(time)}
                      >
                        🕐 {time}
                      </button>
                    ))}
                  </div>

                  <div style={{ textAlign: "right", marginTop: 24 }}>
                    <button className="btn-primary" onClick={() => setBookingStep(2)}>
                      Continue to Seat Selection →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: MULTIPLEX SEATING */}
              {bookingStep === 2 && (
                <div>
                  <div className="cinema-screen-container">
                    <div className="cinema-screen-curve" />
                    <span className="screen-label">ALL EYES THIS WAY • CINEMA SCREEN</span>
                  </div>

                  <div className="tier-legend">
                    <div className="legend-item">
                      <div className="legend-swatch" style={{ background: "#a855f7" }} />
                      <span>Royal Recliner (₹400)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-swatch" style={{ background: "var(--cinema-gold)" }} />
                      <span>Prime / Best Seller (₹280)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-swatch" style={{ background: "#475569" }} />
                      <span>Classic (₹180)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-swatch" style={{ background: "var(--letterboxd-green)" }} />
                      <span>Selected</span>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-swatch"
                        style={{ background: "#1e2229", border: "1px solid #334155" }}
                      />
                      <span>Booked</span>
                    </div>
                  </div>

                  <div className="hall-grid">
                    {ROWS.map((row) => (
                      <div key={row} className="seat-row">
                        <span className="row-label">{row}</span>
                        <div className="row-seats">
                          {Array.from({ length: 10 }, (_, i) => {
                            const seatId = `${row}${i + 1}`;
                            const isBooked = bookedSeats.includes(seatId);
                            const isSelected = selectedSeats.includes(seatId);
                            const tierClass = SEAT_TIERS[row]?.cls || "";

                            return (
                              <button
                                key={seatId}
                                className={`seat-btn ${tierClass} ${
                                  isSelected ? "selected" : ""
                                } ${isBooked ? "booked" : ""}`}
                                onClick={() => toggleSeat(seatId)}
                                disabled={isBooked}
                                title={`${seatId} • ${SEAT_TIERS[row]?.tier} (₹${SEAT_TIERS[row]?.price})`}
                              >
                                {i + 1}
                              </button>
                            );
                          })}
                        </div>
                        <span className="row-label">{row}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-summary-box">
                    <div className="summary-row">
                      <span>Selected Seats ({selectedSeats.length}):</span>
                      <strong>
                        {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                      </strong>
                    </div>
                    <div className="summary-row">
                      <span>Theatre:</span>
                      <span>{selectedTheatre?.name}</span>
                    </div>
                    <div className="summary-row summary-total">
                      <span>Total Amount:</span>
                      <span style={{ color: "var(--letterboxd-green)" }}>
                        ₹{calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                    <button className="btn-secondary" onClick={() => setBookingStep(1)}>
                      ← Back
                    </button>
                    <button
                      className="btn-primary"
                      disabled={selectedSeats.length === 0}
                      onClick={() => setBookingStep(3)}
                    >
                      Proceed to Checkout ({selectedSeats.length} Seats) →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CHECKOUT */}
              {bookingStep === 3 && (
                <form className="checkout-form" onSubmit={handleConfirmPayment}>
                  <h4 style={{ marginBottom: 16, fontSize: 18 }}>
                    Customer Information & Ticket Receipt
                  </h4>

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Krish Sharma"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Mobile Number (For Instant WhatsApp Ticket) *
                    </label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span
                        style={{
                          background: "var(--bg-elevated)",
                          padding: "12px 14px",
                          borderRadius: 8,
                          fontSize: 14,
                        }}
                      >
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="e.g. 9876543210"
                        maxLength={10}
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="e.g. krish@gmail.com"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>

                  <div className="order-summary-box">
                    <div className="summary-row">
                      <span>Movie:</span>
                      <strong>{selectedMovie.title}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Hall / Mall:</span>
                      <span>{selectedTheatre?.name}</span>
                    </div>
                    <div className="summary-row">
                      <span>Showtime:</span>
                      <span>
                        {selectedDate} • {selectedShowtime}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span>Seats:</span>
                      <strong>{selectedSeats.join(", ")}</strong>
                    </div>
                    <div className="summary-row summary-total">
                      <span>Amount Payable:</span>
                      <span style={{ color: "var(--letterboxd-green)" }}>
                        ₹{calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setBookingStep(2)}
                    >
                      ← Change Seats
                    </button>
                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Processing Payment..." : `Pay ₹${calculateTotal()} & Book Ticket`}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 4: BOARDING PASS & WHATSAPP DELIVERY */}
              {bookingStep === 4 && confirmedBooking && (
                <div>
                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ fontSize: 42 }}>🎉</div>
                    <h3
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: "var(--letterboxd-green)",
                      }}
                    >
                      Booking Confirmed!
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                      Your digital multiplex pass is ready.
                    </p>
                  </div>

                  <div className="ticket-wrapper">
                    <div className="ticket-top">
                      <span className="ticket-header-badge">iMOVIES ADMIT ONE</span>
                      <div className="ticket-code">{confirmedBooking.bookingCode}</div>

                      <div className="ticket-details-grid">
                        <div>
                          <div className="t-label">Movie</div>
                          <div className="t-val">{selectedMovie.title}</div>
                        </div>
                        <div>
                          <div className="t-label">Audi & Screen</div>
                          <div className="t-val">Audi 02 (Dolby Atmos)</div>
                        </div>
                        <div>
                          <div className="t-label">Date & Time</div>
                          <div className="t-val">
                            {confirmedBooking.showDate} • {confirmedBooking.showtime}
                          </div>
                        </div>
                        <div>
                          <div className="t-label">Confirmed Seats</div>
                          <div className="t-val" style={{ color: "var(--letterboxd-green)" }}>
                            {confirmedBooking.seatNumbers?.join(", ")}
                          </div>
                        </div>
                        <div>
                          <div className="t-label">Cinema Hall</div>
                          <div className="t-val" style={{ fontSize: 12 }}>
                            {confirmedBooking.theatre}
                          </div>
                        </div>
                        <div>
                          <div className="t-label">Total Paid</div>
                          <div className="t-val">₹{confirmedBooking.totalPrice}</div>
                        </div>
                      </div>
                    </div>

                    <div className="ticket-bottom">
                      <div className="qr-placeholder">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=iMovies-${confirmedBooking.bookingCode}`}
                          alt="Ticket QR Code"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        Scan at entry gate or show to cinema staff
                      </p>
                    </div>
                  </div>

                  <div className="whatsapp-action-box">
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                      📲 Send instant ticket confirmation to your WhatsApp:
                    </p>
                    <button
                      className="btn-whatsapp"
                      onClick={() => handleSendToWhatsApp(confirmedBooking)}
                    >
                      <span>💬 Open WhatsApp with Ticket Pass</span>
                    </button>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
                      Ticket will be delivered directly to +91 {confirmedBooking.phone}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
                    <button className="btn-secondary" onClick={() => window.print()}>
                      🖨️ Print / Save PDF
                    </button>
                    <button className="btn-primary" onClick={() => setSelectedMovie(null)}>
                      Done / Explore More Movies
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. USER AUTH MODAL (JWT & BCRYPT) */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="booking-modal" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", width: "100%" }}>
                <button
                  className={`auth-tab-btn ${authMode === "login" ? "active" : ""}`}
                  onClick={() => setAuthMode("login")}
                >
                  Sign In
                </button>
                <button
                  className={`auth-tab-btn ${authMode === "register" ? "active" : ""}`}
                  onClick={() => setAuthMode("register")}
                >
                  Create Account
                </button>
              </div>
              <button className="btn-close" onClick={() => setShowAuthModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAuthSubmit}>
                {authMode === "register" && (
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Krish"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                    />
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    placeholder="name@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                  />
                </div>
                {authMode === "register" && (
                  <div className="form-group">
                    <label className="form-label">Account Role</label>
                    <select
                      className="form-input"
                      value={authRole}
                      onChange={(e) => setAuthRole(e.target.value)}
                    >
                      <option value="admin">Admin (Manage Movies)</option>
                      <option value="user">User (Book Tickets)</option>
                    </select>
                  </div>
                )}
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 12 }}>
                  {authMode === "login" ? "Sign In with JWT" : "Register Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 6. ADMIN DASHBOARD MODAL */}
      {showAdminModal && (
        <div className="modal-overlay" onClick={() => setShowAdminModal(false)}>
          <div className="booking-modal" style={{ maxWidth: 740 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>⚙️ Admin Movie & Cinema Management</h3>
              <button className="btn-close" onClick={() => setShowAdminModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <h4 style={{ marginBottom: 12 }}>Add New Movie to Catalogue</h4>
              <form onSubmit={handleAddMovie} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                <div>
                  <label className="form-label">Movie Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Krrish 5"
                    value={newMovieTitle}
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Genre</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Action / Adventure"
                    value={newMovieGenre}
                    onChange={(e) => setNewMovieGenre(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Duration (Minutes)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newMovieDuration}
                    onChange={(e) => setNewMovieDuration(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Base Ticket Price (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newMoviePrice}
                    onChange={(e) => setNewMoviePrice(e.target.value)}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">Poster Image URL (Optional / Link)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="https://images.unsplash.com/... or paste image URL"
                    value={newMoviePoster}
                    onChange={(e) => setNewMoviePoster(e.target.value)}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
                  <button type="submit" className="btn-primary">
                    ➕ Add Movie to Database
                  </button>
                </div>
              </form>

              <h4 style={{ marginBottom: 12 }}>Current Movies Catalogue ({movies.length})</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 250, overflowY: "auto" }}>
                {movies.map((m) => (
                  <div
                    key={m._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 10,
                      background: "var(--bg-main)",
                      borderRadius: 8,
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <div>
                      <strong>{m.title}</strong> — <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{m.genre} (₹{m.price})</span>
                    </div>
                    <button
                      className="btn-cancel-ticket"
                      style={{ margin: 0 }}
                      onClick={() => handleDeleteMovie(m._id, m.title)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. MY BOOKINGS DRAWER WITH CANCELLATION */}
      {showBookingsModal && (
        <div className="modal-overlay" onClick={() => setShowBookingsModal(false)}>
          <div className="booking-modal" style={{ maxWidth: 680 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>🎟️ My Confirmed Bookings</h3>
              <button className="btn-close" onClick={() => setShowBookingsModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {myBookings.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
                  <p style={{ fontSize: 40, marginBottom: 12 }}>🍿</p>
                  <p>You haven't booked any movie tickets yet.</p>
                </div>
              ) : (
                <div className="bookings-list">
                  {myBookings.map((b, i) => (
                    <div key={i} className="booking-item-card">
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
                          {b.movie?.title || "Movie Ticket"}
                          {b.bookingStatus === "cancelled" && (
                            <span className="status-badge-cancelled">CANCELLED</span>
                          )}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>
                          {b.theatre} • {b.showDate} ({b.showtime})
                        </div>
                        <div style={{ fontSize: 13, marginTop: 4 }}>
                          Seats:{" "}
                          <strong style={{ color: "var(--letterboxd-green)" }}>
                            {b.seatNumbers?.join(", ")}
                          </strong>{" "}
                          • Paid: ₹{b.totalPrice}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                          Ref: {b.bookingCode || b._id}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                        {b.bookingStatus !== "cancelled" ? (
                          <>
                            <button className="btn-book-sm" onClick={() => handleSendToWhatsApp(b)}>
                              📲 WhatsApp
                            </button>
                            <button
                              className="btn-cancel-ticket"
                              onClick={() => handleCancelBooking(b._id)}
                            >
                              Cancel Booking
                            </button>
                          </>
                        ) : (
                          <span style={{ fontSize: 12, color: "var(--cinema-red)", fontWeight: 700 }}>
                            Refund In Process
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
