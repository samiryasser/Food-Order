import React from "react";
import useHttp from "../assets/Hooks/useHttp";
import MealItem from "./MealItem";

const config = {};
const Meals = () => {
  const { data, isLoading, error, sendRequest } = useHttp(
    "http://localhost:3000/meals",
    config,
    []
  );
  if (isLoading) {
    <p className="center">Fetching Data Please Wait ...</p>;
  }
  if (error) {
    <Error title="Faild to fetch data" message={error} />;
  }
  return (
    <ul id="meals">
      {data.length > 0 &&
        data.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  );
};

export default Meals;
