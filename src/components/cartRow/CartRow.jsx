import PropTypes from "prop-types";
import ItemType from "../../types/ItemType";
import { CartTypes } from "../../reducers/cartReducer";
import { useState } from "react";

function CartRow({ cartItem, items, dispatch }) {
  
  const [selectedQuantity, setSelectedQuantity] = useState(cartItem.quantity);
  
  const item = items.find((i) => i.itemId === cartItem.itemId);
  const removeItemFromCart = () =>
    dispatch({
      type: CartTypes.REMOVE,
      itemId: item.itemId,
    });

  const addAnotherInCart = () =>
    dispatch({
      type: CartTypes.ADD,
      itemId: item.itemId,
    });

  const decreaseFromCart = () => {
    dispatch({
      type: CartTypes.DECREASE,
      itemId: item.itemId,
    });
  };

  const selectQuantity = (event) => {
    const quantity = Number(event.target.value);
    dispatch({
      type: CartTypes.SELECT,
      itemId: item.itemId,
      quantity,
    });
    setSelectedQuantity(quantity);
  };

  return (
    <tr>
      <td>{cartItem.quantity}</td>
      <td>{item.title}</td>
      <td>
        ${((item.salePrice ?? item.price) * cartItem.quantity).toFixed(2)}
      </td>
      <td className="buttons">
        <button type="button" onClick={addAnotherInCart}>
          +
        </button>
        <button type="button" onClick={decreaseFromCart}>
          - 
        </button>
        <button type="button" onClick={removeItemFromCart}>
          X
        </button>
        <select value={selectedQuantity} onChange={selectQuantity}>
          {Array.from({ length: 21 }, (_, i) => i).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}

CartRow.propTypes = {
  cartItem: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default CartRow;
