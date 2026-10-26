const mongoose = require("mongoose");
require("dotenv").config();
const Movie = require("./Movie");

const sampleMovies = [
  {
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
    title: "Interstellar (10th Anniversary IMAX)",
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers.",
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
    title: "The Batman: Part II",
    description: "In his second year of fighting crime, Batman pursues the darker shadows of Gotham's underworld while corruption threatens the heart of the city.",
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
    title: "Kalki 2898 AD",
    description: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces in a dystopian setting.",
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

async function seedDatabase() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas!");

    // Clear and insert fresh data
    await Movie.deleteMany({});
    console.log("Cleared old movies.");

    const inserted = await Movie.insertMany(sampleMovies);
    console.log(`✅ Successfully seeded ${inserted.length} Letterboxd-grade movies!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedDatabase();
