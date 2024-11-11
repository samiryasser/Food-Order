import React, { useContext } from "react";
import CartContexts from "../Store/CartContexts";
import { currencyFormatter } from "../Util/Formatting";
import Button from "./UI/Button";
const MealItem = ({ meal }) => {
  const cartCtx=useContext(CartContexts);
  const handleAddMealToCard = () => {
    cartCtx.AddItem(meal);
  };
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCard}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
