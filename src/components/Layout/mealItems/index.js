import React, { useContext } from "react";
import PropTypes from 'prop-types';
import getImage from "../../../utils/getImage";
import { useNavigate } from "react-router-dom";
import './mealItems.css';
// import { FoodContext } from "../../../utils/context";


export default function MealItem (props) {
  const navigate = useNavigate();
  // const {value} = useContext(FoodContext);
  const handleClick = () => {
    navigate(`./item-description/${props.id}`);
  }
  return (
    <div className="meal-div" onClick={handleClick}>
      <img
        className="h-52 w-72"
        src={getImage(props.image)}
        alt={props.name}
      />
      <div className="flex pt-2.5">
        <p className="flex-1">
          <b> {props.name} </b>
        </p>
        <span className="text-red-600"> {props.price} </span>
        
      </div>
      <p className="py-4"> {props.description} </p>
      <button className="bg-red-500 px-6 py-2 rounded-lg">Order</button>
    </div>
  )
}
MealItem.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string

}