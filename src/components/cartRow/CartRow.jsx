import PropTypes from "prop-types";
import ItemType from "../../types/ItemType";
import { CartTypes } from "../../reducers/cartReducer";

function CartRow({ cartItem, items, dispatch }) {
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
