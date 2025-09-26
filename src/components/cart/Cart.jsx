import "./Cart.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ItemType from "../../types/ItemType";
import CartRow from "../cartRow/CartRow";
import axios from "axios";
import Alert from "../alert/Alert";

const Cart = ({ cart, items, dispatch }) => {
  // Estados para armazenar os dados
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCEP] = useState("");
  const [couponCode, setCouponCode] = useState(""); // TODO: implementar funcionalidade de cupom  de desconto
  const [isEmployeeOfTheMonth, setIsEmployeeOfTheMonth] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Refs para debounce e input de cep
  const debounceRef = React.useRef(null);
  const cepRef = React.useRef(null);

  // Validação do formulário
  const isFormValid = cep.length === 8 && name.trim();

  // Calculos de valor total, subtotal e taxa
  const taxPercentage = parseInt(cep.substring(0, 1) || "0", 10) + 1;
  const taxRate = taxPercentage / 100;
  const subTotal = isEmployeeOfTheMonth
    ? 0
    : cart.reduce((acc, item) => {
        const detailItem = items.find((i) => i.itemId === item.itemId);
        const itemPrice = detailItem.salePrice ?? detailItem.price;
        return item.quantity * itemPrice + acc;
      }, 0);
  const tax = couponCode ? 0 : subTotal * taxRate;
  const total = subTotal + tax;

  // Função de formatação
  const formatPhoneNumber = (value) => {
    if (!value) return "";

    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 11) {
      cepRef.current?.focus();
    }
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

  // Funções de handlers
  const nameHandler = (event) => setName(event.target.value);
  const phoneHandler = (event) => {
    const formatted = formatPhoneNumber(event.target.value);
    setPhone(formatted);
  };
  const cepHandler = (event) => setCEP(event.target.value);
  const couponCodeHandler = (event) => setCouponCode(event.target.value);

  // Função de submissão do pedido
  const submitOrder = async (event) => {
    try {
      event.preventDefault();
      setIsSubmitting(true);
      const orderData = {
        items: cart,
        name,
        phone,
        cep,
        isEmployeeOfTheMonth,
      };

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(axios.post("http://localhost:3030/api/orders", orderData));
        }, 2000);
      });

    } catch (error) {
      console.error("Error submitting order", error);
    } finally {
      setShowSuccessAlert(true);
      setIsSubmitting(false);
      setName("");
      setPhone("");
      setCEP("");
      setCouponCode("");
      setIsEmployeeOfTheMonth(false);
      dispatch({ type: "CLEAR" }); // Limpa o carrinho após o pedido ser enviado
    }
  };

  // Função de debounce para verificar se o nome é funcionário do mês
  const onChangeName = (event) => {
    const newName = event.target.value;
    nameHandler(event);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      const encodedName = encodeURIComponent(newName);
      const url = `http://localhost:3030/api/employees/isEmployeeOfTheMonth?name=${encodedName}`;

      axios
        .get(url)
        .then((response) => {
          setIsEmployeeOfTheMonth(response?.data?.isEmployeeOfTheMonth);
        })
        .catch(console.error);
    }, 300);
  };

  return (
    <div className="cart-component">
      <Alert visible={showSuccessAlert}>
        <div>Order placed successfully!</div>
      </Alert>
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
                onChange={onChangeName}
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
                ref={cepRef}
              />
            </label>
            <label htmlFor="couponCode">
              Coupon Code (not working yet)
              <input
                type="text"
                id="coupon"
                onChange={couponCodeHandler}
                value={couponCode}
              />
            </label>
            <button type="submit" disabled={!isFormValid || isSubmitting}>
              Order Now
            </button>
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
