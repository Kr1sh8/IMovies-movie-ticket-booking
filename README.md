# 🎬 iMovies — Modern Movie Ticket Booking & Cinema Multiplex Platform

> **Full Stack MERN Capstone Project** developed for the **Experiential Learning Program (SmartBridge & MongoDB)** in partnership with **nasscom FutureSkills Prime**.
>
> 🚀 **Live Hosted Website:** [https://imovies-movie-ticket-booking-drab.vercel.app](https://imovies-movie-ticket-booking-drab.vercel.app)

![iMovies Banner](https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80)

---

## 🌟 Key Features (100% Requirement Compliant)

### 1. 🎞️ Letterboxd-Inspired Cinema UI & Search
* Dark mode aesthetic (`#0b0e14`) with neon-green Letterboxd accents and gold highlights.
* Hero spotlight premiere banner with trailer backdrop, duration, certificate, and IMDb ratings.
* Dynamic movie cards with interactive hover effects and live pricing.
* Search filter by movie name, genre, and city selector (`Delhi NCR`, `Mumbai`, `Bengaluru`).

### 2. 🔐 Role-Based Security & Authentication (JWT + Bcrypt.js)
* **User & Admin Roles:** Registration and Login powered by JSON Web Tokens (JWT) and `bcryptjs` password hashing.
* Secure state persistence and protected routes.

### 3. ⚙️ Admin Movie & Cinema Management Panel
* Dedicated Admin Dashboard to dynamically add new movies (title, genre, runtime, pricing, poster URL) or delete outdated titles from the catalogue.

### 4. 🏢 Multiplex & Theatre Selection
* Choose from leading theatres: PVR Superplex, INOX Megaplex, Cinepolis VIP.
* Smart travel distance tags: `5 min by 🛺 E-Rickshaw`, `10 min by 🚇 Metro Line 3`.
* Supported formats: **IMAX 3D**, **Dolby Atmos 7.1**, **4DX**, **Laser Ultra**.

### 5. 💺 Visual Multiplex Seating Matrix
* Realistic curved cinema screen canvas (`ALL EYES THIS WAY`).
* **Categorized Tier Pricing:**
  * 🛋️ **Royal Recliner** (Row A, ₹400) — Luxury plush leather recliners.
  * 🌟 **Prime / Best Seller** (Rows B & C, ₹280) — Best viewing angle & extra legroom (gold highlight).
  * 🎟️ **Classic Standard** (Rows D, E, F, ₹180) — High value comfort.
* Real-time seat selection with maximum cap and live total price calculation.

### 6. 📲 Instant WhatsApp Digital Pass & Dynamic QR Code
* Generates an authentic digital boarding pass ticket with QR code and unique reference ID (`IMV-XXXXX`).
* **One-Click WhatsApp Integration:** Opens WhatsApp with a pre-filled, beautifully formatted ticket receipt sent directly to the user's phone number!
* Option to print or download PDF tickets directly.

### 7. 🚫 Booking Cancellation & Seat Liberation
* Users can view their booking history under "My Bookings" and cancel any active ticket, instantly freeing up the seats for other moviegoers and initiating demo refunds.

### 8. 🔔 Floating Toast Notifications
* Real-time animated feedback toasts for actions (login, registration, ticket confirmation, booking cancellation, errors).

---

## 🛠️ Tech Stack

* **Frontend:** React.js 19, Vite, Axios, Modern Responsive CSS (Letterboxd Design System).
* **Backend:** Node.js, Express.js REST API, CORS, Dotenv.
* **Authentication:** JSON Web Tokens (JWT), Bcrypt.js password hashing.
* **Database:** MongoDB Atlas (Cloud NoSQL), Mongoose ODM with query indexing.
* **Deployment:** Vercel (Production CI/CD).
* **External APIs:** QR Server API (Dynamic QR codes), WhatsApp Web API.

---

## 📂 Project Architecture

```
imovies/
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx             # Main Cinema Hub, Auth, Admin & Booking Engine
│   │   ├── App.css             # Letterboxd Dark Cinema Design System
│   │   ├── main.jsx
│   │   └── index.html          # Google Fonts & Cinema Meta
│   └── package.json
│
├── server/                     # Backend (Express + MongoDB)
│   ├── User.js                 # User Schema (JWT Auth & Bcrypt)
│   ├── Movie.js                # Movie Mongoose Schema (Ratings, Theatres, Formats, Indexes)
│   ├── Booking.js              # Booking Schema (User, Seats, WhatsApp Phone, Code, Indexes)
│   ├── seed.js                 # Automatic Database Seeder script
│   ├── index.js                # REST API Routes & Auth/Seat Controllers
│   ├── .env                    # MongoDB Atlas Connection URI
│   └── package.json
│
├── vercel.json                 # Zero-Config Production Deployment
├── PROJECT_REPORT.md           # Full Capstone Report with Architecture & ER Diagrams
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

### 2. Start Frontend Client
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
