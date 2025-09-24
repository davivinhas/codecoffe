export const initialCartState = [];

export const CartTypes = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  DECREASE: "DECREASE",
};

const findItem = (cart, itemId) => cart.find((item) => item.itemId === itemId);

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CartTypes.ADD:
      if (findItem(state, action.itemId)) {
        return state.map((item) =>
          item.itemId === action.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { itemId: action.itemId, quantity: 1 }];

    case CartTypes.REMOVE:
      return state.filter((item) => item.itemId !== action.itemId);

    case CartTypes.DECREASE:
      if (findItem(state, action.itemId)) {
        return state
        .map((item) =>
          item.itemId === action.itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      }
    case CartTypes.select:
      if (findItem(state, action.itemId)) {
        return state
        .map((item) =>
          item.itemId === action.itemId
            ? { ...item, quantity: action.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);
      }
      return [...state, { itemId: action.itemId, quantity: action.quantity }];

    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};
