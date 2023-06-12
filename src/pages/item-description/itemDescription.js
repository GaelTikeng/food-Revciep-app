import React, {useState} from "react";
import { useParams } from "react-router-dom";
import getImage from "../../utils/getImage";
import Popup from "../../components/popup/popup";
import { useNavigate } from "react-router-dom";
import { useFooditerms } from "../../utils/context";


export default function ItemDetails () {
  // We use useParam hook to access the parameter values from the url.
  const {id} = useParams(); // get the url parameter
  // const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate(`/${id}/orderFood`)
  }
  
  const myStyle = {
    width:"500px",
    margin:"10px auto",
    border:"2px solid black", borderRadius:"10px",
    backgroundColor:"#4e4a4ae0"
  }
  const pageStyle = {
    backgroundSize: "cover",
    backgroundImage: "url('https://c8.alamy.com/compfr/2ke83x1/cuisine-authentique-du-cameroun-assiette-avec-drapeau-camerounais-et-coutellerie-2ke83x1.jpg')"
  }

  const localFood = JSON.parse(localStorage.getItem('foodItems'))

  const foodDesc = localFood.find((food) => food.id == id);
  return (
    <div style={pageStyle}>
      <div style={myStyle} className="shadow-2xl p-2">
        <img
          src={getImage(foodDesc.image)}
          alt={foodDesc.name}
        />
        <div className="flex">
          <h1 className="text-3xl flex-1 pt-4 text-white"><b>{foodDesc.name}</b></h1>
          <p className="text-4xl text-red-600 pt-4"> {foodDesc.price} </p>
        </div>
        
        <p className="text-white text-xl py-4"> {foodDesc.description} </p>
        <button onClick={handleOrder} className="bg-red-500 px-6 py-2 rounded-lg text-white">Buy</button>
      </div>
      
    </div>
  )
}