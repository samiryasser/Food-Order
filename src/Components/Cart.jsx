import React, { useContext } from "react";
import CartContexts from "../Store/CartContexts";
import UserProgressContext from "../Store/UserProgressContext";
import { currencyFormatter } from "../Util/Formatting";
import CartItem from "./CartItem";
import Button from "./UI/Button";
import Modal from "./UI/Modal";

const Cart = () => {
  const crtCrx = useContext(CartContexts);
  const userCtx = useContext(UserProgressContext);
  const crtTotlal = crtCrx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  const handleClose = () => {
    userCtx.hideCart();
  };
  const handelIncrease = (item) => {
    crtCrx.AddItem(item);
  };
  const handelDecrease = (item) => {
    crtCrx.RemoveItem(item.id);
  };
  const handleGoToCheckout = () => {
    userCtx.showCheckout();
}
  return (
    <Modal className="cart" open={userCtx.progress === "cart"}
    onClose={userCtx.progress === "cart"?handleClose:null}>
      <h2>Your Cart</h2>
      <ul>
        {crtCrx.items.map((item) => (
          <CartItem
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            key={item.id}
            onIncrease={() => handelIncrease(item)}
            onDecrease={() => handelDecrease(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(crtTotlal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {crtCrx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go To CheckOut</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
