import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { cartReducer, initialCartState } from "./reducers/cartReducer";


import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Details from "./components/details/Details";
import NotFound from "./components/notFound/NotFound";
import DetailItem from "./components/detailsItem/DetailItem";
import Cart from "./components/cart/Cart";


function App() {
  const [items, setItems] = useState([]);

  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/items`)
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Router>
        <Header cart={cart}>Code Café</Header>

        {items.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home items={items} />} />

            <Route path="*" element={<NotFound />}></Route>

            <Route path="/cart" element={<Cart cart={cart} items={items} dispatch={dispatch}/>} />

            <Route path="/details" element={<Details items={items} />}>
              <Route
                path=":id"
                element={<DetailItem items={items} dispatch={dispatch} />}
              />
              <Route index element={<div>No item selected</div>} />
            </Route>
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
