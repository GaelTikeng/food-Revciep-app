import React, {useState} from "react";
import { useParams } from "react-router-dom";
import getImage from "../../utils/getImage";
import { useNavigate } from "react-router-dom";
// import { useFooditerms } from "../../utils/context";
import './itemDescription.css';


export default function ItemDetails () {
  // We use useParam hook to access the parameter values from the url.
  const {id} = useParams(); // get the url parameter
  // const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate(`/${id}/orderFood`)
  }

  const localFood = JSON.parse(localStorage.getItem('foodItems'))

  const foodDesc = localFood.find((food) => food.id == id);
  return (
    <div className="page-style">
      <div className="my-style">
        <img
          src={getImage(foodDesc.image)}
          alt={foodDesc.name}
        />
        <div className="conten">
          <h1 className="food-name"><b>{foodDesc.name}</b></h1>
          <p className="price"> {foodDesc.price} </p>
        </div>
        
        <p className="description"> {foodDesc.description} </p>
        <button onClick={handleOrder} className="order-botton">Buy</button>
      </div>
      
    </div>
  )
}