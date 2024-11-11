import { createContext, useReducer } from "react";

const CartContexts = createContext({
  items: [],
  AddItem: (item) => {},
  RemoveItem: (id) => {},
  ClearCart: () => {},
});
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updatedItems = [...state.items];
    const itemToRemove = state.items[existingCartItemIndex];
    if (itemToRemove.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...itemToRemove,
        quantity: itemToRemove.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
};
export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const AddItem = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };
  const RemoveItem = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };
  const ClearCart = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  }
  const cartContext = {
    items: cart.items,
    AddItem,
    RemoveItem,
    ClearCart,
  };
  return (
    <CartContexts.Provider value={cartContext}>
      {children}
    </CartContexts.Provider>
  );
};
export default CartContexts;
