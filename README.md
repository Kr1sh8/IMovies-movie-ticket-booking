# 🎬 iMovies — Modern Movie Ticket Booking & Multiplex Experience

> **Full Stack MERN Capstone Project** developed for the **Experiential Learning Program (SmartBridge & MongoDB)**.

![iMovies Banner](https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80)

---

## 🌟 Key Features

### 1. 🎞️ Letterboxd-Inspired Cinema UI
* Dark mode aesthetic (`#0b0e14`) with neon-green Letterboxd accents and gold highlights.
* Hero spotlight premiere banner with trailer backdrop, duration, certificate, and IMDb ratings.
* Dynamic movie cards with interactive hover effects and live pricing.
* Search filter by movie name, genre, and city selector (`Delhi NCR`, `Mumbai`, `Bengaluru`).

### 2. 🏢 Multiplex & Theatre Selection
* Choose from leading theatres: PVR Superplex, INOX Megaplex, Cinepolis VIP.
* Smart travel distance tags: `5 min by 🛺 E-Rickshaw`, `10 min by 🚇 Metro Line 3`.
* Supported formats: **IMAX 3D**, **Dolby Atmos 7.1**, **4DX**, **Laser Ultra**.

### 3. 💺 Visual Multiplex Seating Matrix
* Realistic curved cinema screen canvas (`ALL EYES THIS WAY`).
* **Categorized Tier Pricing:**
  * 🛋️ **Royal Recliner** (Row A, ₹400) — Luxury plush leather recliners.
  * 🌟 **Prime / Best Seller** (Rows B & C, ₹280) — Best viewing angle & extra legroom.
  * 🎟️ **Classic Standard** (Rows D, E, F, ₹180) — High value comfort.
* Real-time seat selection with maximum cap and live total price calculation.

### 4. 📲 Instant WhatsApp Digital Pass (Showstopper)
* Generates an authentic digital boarding pass ticket with QR code and unique reference ID (`IMV-XXXXX`).
* **One-Click WhatsApp Integration:** Opens WhatsApp with a pre-filled, beautifully formatted ticket receipt sent directly to the user's phone number!
* Option to print or download PDF tickets directly.

### 5. 🎟️ "My Bookings" Tracker
* Persists confirmed bookings in MongoDB and local session for instant retrieval.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, Axios, Modern Vanilla CSS (Custom Design System).
* **Backend:** Node.js, Express.js REST API, CORS.
* **Database:** MongoDB Atlas (Cloud NoSQL), Mongoose ODM.
* **Authentication & IDs:** Unique cryptographic Booking References (`IMV-XXXXX`).
* **External APIs:** QR Code Generation API, WhatsApp Web / Direct Send API.

---

## 📂 Project Architecture

```
imovies/
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx             # Main Cinema Hub, Booking Flow, WhatsApp Trigger
│   │   ├── App.css             # Letterboxd Dark Cinema Design System
│   │   ├── main.jsx
│   │   └── index.html          # Google Fonts & Cinema Meta
│   └── package.json
│
├── server/                     # Backend (Express + MongoDB)
│   ├── Movie.js                # Movie Mongoose Schema (Ratings, Theatres, Formats)
│   ├── Booking.js              # Booking Schema (User, Seats, WhatsApp Phone, Code)
│   ├── seed.js                 # Automatic Database Seeder script
│   ├── index.js                # REST API Routes & Seat Availability Controller
│   ├── .env                    # MongoDB Atlas Connection URI
│   └── package.json
│
└── README.md                   # Project Documentation
```

---

## 🚀 How to Run Locally

### 1. Start Backend Server
```bash
cd server
npm install
node index.js
```
*Backend will run at `http://localhost:5000`*

### 2. Seed Movies (Optional if MongoDB Atlas is connected)
```bash
cd server
node seed.js
```

### 3. Start Frontend Client
```bash
cd client
npm install
npm run dev
```
*Open `http://localhost:5173` in your browser.*

---

## 👥 Author
* **Krish** — [GitHub Profile](https://github.com/Kr1sh8)
* Built for **SmartBridge Experiential Learning Capstone Submission**.
