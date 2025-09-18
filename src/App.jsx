import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/items`)
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Router>
        <Header>Code Café</Header>
        <Routes>
          <Route path="/" element={<Home items={items} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
