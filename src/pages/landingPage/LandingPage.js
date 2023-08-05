import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealItem from '../../components/Layout/mealItems';
import './landingPage.css';
// import { FoodContext } from '../utils/context';

// import Header from './components/Layout/Header';

export const meals = [
  {
    id: 1,
    image: "ndole-plantain-a-la-vapeur",
    name: "Ndolé plantain a la vapeur",
    description: "Ndolé accompagné du plantain a la vapeur",
    price: "2500frs"
  },
  {
    id: 2,
    image: "eru-and-garry",
    name: "Eru",
    description: "Eru and garry with meat and canda",
    price: "3000frs"
  },
  {
    id: 3,
    image: "taro",
    name: "taro",
    description: "Taro sauce jaune",
    price: "4000frs"
  },
  {
    id: 4,
    image: "kok",
    name: "kok",
    description: "kok baton de manioc ou manioc",
    price: "2500frs"
  },
  {
    id: 5,
    image: "konko-meat",
    name: "kongo meat",
    description: "Escargo roti",
    price: "2500frs"
  },
  {
    id: 6,
    image: "poison",
    name: "poison",
    description: "poisson braisé accompagné des battons de manioc",
    price: "3000frs"
  },
  {
    id: 7,
    image: "met-de-pistage",
    name: "met de pistage",
    description: "met de pistage accompagné des battons de manioc",
    price: "1500frs"
  },
  {
    id: 8,
    name: "Ndolé ",
    image: "ndole-avec-crevettes",
    description: "Ndolé avec les crivette accompagné des frites de plantain",
    price: "3000frs"
  },
  {
    id: 9,
    image: "pommes",  
    name: "Pommes pilé ",
    description: "Pommes pilé avec du haricot",
    price: "3500frs"
  }
]

localStorage.setItem('foodItems', JSON.stringify([...meals]))

export default function LandingPage () {
  // const {value} = useContext(FoodContext);
  const [addedFood, setAddedFood] = useState([]);
  const [food, setFood] = useState([]);

  useEffect( () => {
    setAddedFood(JSON.parse(localStorage.getItem("foodItems")));
    setFood(JSON.parse(localStorage.getItem("foodItem")))
  },[])


  const mealList = addedFood?.map((meal) => (
    <MealItem
      key={meal.id}
      image={meal.image}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));

  const addedMeal = Object.entries(food).map((eat) => (
    <MealItem
      key = {eat.name}
      name = {eat.name}
      price = {eat.price}
      description = {eat.description}
    />
  ))

  return (
    <div className='cover'>
      <div className='food'>
        {mealList}
      </div>
      
    </div>
     
  )
}
LandingPage.prototype = {
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string
}