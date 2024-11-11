import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import CartContexts from "../Store/CartContexts";
import UserProgressContext from "../Store/UserProgressContext";
import Button from "./UI/Button";
const Header = () => {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContexts);
  const totalCartItems = cartCtx.items.reduce(
    (totalNoOfItems, item) => totalNoOfItems + item.quantity,
    0
  );
  const handleShowCart = () => {
    userProgressCtx.showCart();
  };
  return (
    <header>
      <div id="main-header">
        <div id="title">
          <img src={logo} alt="logo" />
          <h1>Food Order</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>
            Cart( {totalCartItems} )
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
