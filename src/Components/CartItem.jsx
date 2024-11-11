import React, { useContext } from "react";
import CartContexts from "../Store/CartContexts";
import { currencyFormatter } from "../Util/Formatting";
import Button from "./UI/Button";

const CartItem = ({name,quantity,price,onIncrease,onDecrease}) => {
    const cartCtx=useContext(CartContexts);

  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} X {currencyFormatter.format(price)}  
      </p>
      <p className="cart-item-actions">
        <Button onClick={onDecrease}>-</Button>
        <span>{quantity}</span>
        <Button onClick={onIncrease}>+</Button>
      </p>
    </li>
  );
};

export default CartItem;
