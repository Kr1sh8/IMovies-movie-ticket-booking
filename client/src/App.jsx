import { createElement as h, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovies(res.data));
  }, []);

  return h(
    "div",
    { className: "container" },
    h("h1", null, "IMovies 🎬"),
    h("p", null, "Your destination for booking movie tickets!"),
    h("h2", null, "Now Showing"),
    h(
      "div",
      { className: "grid" },
      movies.map((m) =>
        h(
          "div",
          { className: "card", key: m._id },
          h("img", { src: m.poster, alt: m.title }),
          h("h3", null, m.title),
          h("p", null, m.genre + " • " + m.language + " • " + m.duration + " min"),
          h("p", null, "₹" + m.price),
          h("button", null, "Book Tickets")
        )
      )
    )
  );
}

export default App;