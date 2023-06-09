import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import MealItem from "../components/Layout/mealItems";
import { FoodContext } from "../utils/context";

// import Header from './components/Layout/Header';

export default function LandingPage() {
  const { value } = useContext(FoodContext);
  const [addedFood, setAddedFood] = useState([]);

  useEffect(() => {
    setAddedFood(JSON.parse(localStorage.getItem("foodItems")));
  }, []);

  const mealList = addedFood.map((meal) => (
    <MealItem
      key={meal.id}
      image={meal.image}
      selectItem={(id) => {}}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));

  const addedMeal = Object.entries(value).map((food) => (
    <MealItem
      key={food.name}
      name={food.name}
      price={food.price}
      description={food.description}
    />
  ));

  return (
    <div>
      <div
        className="shadow-2xl"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          margin: "10px",
          marginTop: "90px",
          width: "98%",
          justifyContent: "space-around",
          padding: "20px 0",
        }}
      >
        {mealList}
      </div>
    </div>
  );
}
LandingPage.prototype = {
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
};
