import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import Details from "./components/details/Details";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/notFound/NotFound";
import DetailItem from "./components/detailsItem/DetailItem";

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

          <Route path="*" element={<NotFound />}></Route>

          <Route path="/details" element={<Details items={items} />}>
            <Route path=":id" element={<DetailItem />} />
            <Route index element={<div>No item selected</div>} />

          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
