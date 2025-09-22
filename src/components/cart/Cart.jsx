import "./Cart.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ItemType from "../../types/ItemType";
import CartRow from "../cartRow/CartRow";

const Cart = ({ cart, items, dispatch }) => {
  const subTotal = cart.reduce((acc, item) => {
    const detailItem = items.find((i) => i.itemId === item.itemId);
    const itemPrice = detailItem.salePrice ?? detailItem.price;
    return item.quantity * itemPrice + acc;
  }, 0);

  // função de formatação
  const formatPhoneNumber = (value) => {
    if (!value) return "";

    const digits = value.replace(/\D/g, "").slice(0,11);

    const ddd = digits.slice(0, 2);
    const part1 =
      digits.length > 2 ? digits.slice(2, digits.length > 10 ? 7 : 6) : "";
    const part2 =
      digits.length > (digits.length > 10 ? 7 : 6)
        ? digits.slice(digits.length > 10 ? 7 : 6)
        : "";

    if (digits.length <= 2) {
      return `(${ddd}`;
    } else if (digits.length <= 6) {
      return `(${ddd}) ${part1}`;
    } else if (digits.length <= 10) {
      return `(${ddd}) ${part1}-${part2}`;
    } else {
      return `(${ddd}) ${part1}-${part2}`;
    }
  };

  const submitOrder = (event) => {
    event.preventDefault();
    console.log("name: ", name);
    console.log("phone: ", phone);
    console.log("cep: ", cep);
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCEP] = useState("");

  const nameHandler = (event) => setName(event.target.value);
  const phoneHandler = (event) => {
    const formatted = formatPhoneNumber(event.target.value);
    setPhone(formatted);
  };

  const cepHandler = (event) => setCEP(event.target.value);

  const taxPercentage = parseInt(cep.substring(0, 1) || "0", 10) + 1;
  const taxRate = taxPercentage / 100;
  const tax = subTotal * taxRate;

  const total = subTotal + tax;

  const isFormValid = cep.length === 8 && name.trim();

  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Item</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartRow
                  key={item.itemId}
                  cartItem={item}
                  items={items}
                  dispatch={dispatch}
                />
              ))}
            </tbody>
          </table>
          <div>Subtotal: ${subTotal.toFixed(2)}</div>
          {cep.length === 8 ? (
            <>
              <div>Tax: ${tax.toFixed(2)}</div>
              <div>Total: ${total.toFixed(2)}</div>
            </>
          ) : (
            <div className="warning">Enter your CEP to get total</div>
          )}

          <h2>Checkout</h2>
          <form onSubmit={submitOrder}>
            <label htmlFor="name">
              Name
              <input
                id="name"
                type="text"
                value={name}
                onChange={nameHandler}
                required
              />
            </label>
            <label htmlFor="phone">
              Phone Number
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={phoneHandler}
              />
            </label>
            <label htmlFor="CEP">
              CEP
              <input
                id="cep"
                type="text"
                maxLength="8"
                inputMode="numeric"
                value={cep}
                onChange={cepHandler}
                required
              />
            </label>
            <button type="submit" disabled={!isFormValid}>Order Now</button>
          </form>
        </>
      )}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Cart;
