import React, { useContext } from "react";
import Button from "./Components/UI/Button";
import Input from "./Components/UI/Input";
import Modal from "./Components/UI/Modal";
import CartContexts from "./Store/CartContexts";
import UserProgressContext from "./Store/UserProgressContext";
import { currencyFormatter } from "./Util/Formatting";
import useHttp from "./assets/Hooks/useHttp";
const config = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};
const Checkout = () => {
  const cartCtx = useContext(CartContexts);
  const userCtx = useContext(UserProgressContext);
  const { data, isLoading, error, sendRequest,clearData } = useHttp(
    "http://localhost:3000/meals",
    config,
    []
  );

  const totalAmount = cartCtx.items.reduce((total, item) => {
    total + item.price * item.quantity;
  }, 0);
  const handleClose = () => {
    userCtx.hideCheckout();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const customData = Object.fromEntries(fd.entries());
    try {
      sendRequest(
        JSON.stringify({
          order: {
            customer: customData,
            items: cartCtx.items,
          },
        })
      );
      userCtx.hideCheckout();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFinish=()=>{
    userCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  if (data.length>0 && !error) {
    return (
      <Modal open={userCtx.progress === "checkout"} onClose={handleClose}>
        <h2>Your Order is Successfully Placed</h2>
        <p>Thank you for your order</p>
        <p>Operation details will send to you via email</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Ok</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(totalAmount)} </p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          {error && <Error title="Faild to submit order" message={error} />}
          {isLoading && <p>Sending Request ...</p>}
          {!isLoading && (
            <>
              <Button textOnly onClick={handleClose} type="button">
                Cancel
              </Button>
              <Button type="submit"> Submit the Order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
