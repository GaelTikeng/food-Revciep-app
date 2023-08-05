import React, { useState } from 'react'
import SideMenu from '../../components/sideMenu/sideMenu';
import './accountPage.css';



export default function Account () {

  const [localData, setLocalData] = useState(JSON.parse(localStorage.getItem("foodItems")));
  const [showAddForm, setShowAddForm] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    id: 0
  });


  // const myUser = JSON.parse(localStorage.getItem('userInfo'));

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setProductData((preProductData) => ({...preProductData, [name]: value,
  //   }));
  //   // console.log(value)
  // }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevProductData) => ({
      ...prevProductData,
      [name]: value,
    }));
  };

  // const handDelete = (name)=>{
  //   const localData = JSON.parse(localStorage.getItem("foodItem"));
  //   const update = localData?.filter((item) => {
  //     return item.name !== name;
  //   });
  //   localStorage.getItem("foodItem", JSON.stringify(update));
  //   setValue('');
  //   // console.log(update); 
  //   console.log(value);
  // }

  const handleDelete = (name) => {
    const data = JSON.parse(localStorage.getItem("foodItems"));
    const update = data?.filter((iterm) => {
      return iterm.name !== name;
    });
    localStorage.setItem('foodItems', JSON.stringify(update))
    setLocalData(update)
  };

  const convert2base64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const uploadImage = async(e) => {
    const file = e.target.files[0];
    const base64 = await convert2base64(file);
    setProductData((prev) => ({...prev, image: base64}));
    console.log(base64);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("foodItem")) || [];
    localStorage.setItem(
      "foodItem",
      JSON.stringify([...data, productData])
    );
    alert("Food successfully added");

    setLocalData([...localData, productData])
  }

  

  return (
    <div className='all'>
      <SideMenu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />

      <div className='pt-20 flex justify-between left-20'>
        <h1 className='ml-5 text-2xl'>Dashboard</h1>

        <button type='submit'
        style={{border:"1px solid", borderRadius:"8px", padding:"5px"}}
          className='bg-green-300 right-20 mr-5'
          onClick={()=> setShowAddForm((prev) => !prev)}
        >
          Add new meal
        </button>
      </div>
      {showAddForm && (     
        
        <form className='add-food' 
          onSubmit={handleSubmit}>
          <input
            type='text'
            name="name"
            value={productData.name}
            placeholder='Meal name'
            onChange={handleChange}
            style={{border: "2px solid ", borderRadius:"5px", padding: "5px"}}
          />
          <input
            type='number'
            placeholder='Price'
            value={productData.price}
            onChange={handleChange}
            name='price'           
            style={{border: "2px solid ", borderRadius:"5px", padding: "5px"}}
          />
          <textarea
            name='description'
            value={productData.description}
            onChange={handleChange}
            placeholder='Food description'
            cols="60"
            rows="3"
            style={{border: "2px solid ", borderRadius:"5px", padding: "5px"}}
          >
            Product description
          </textarea>
          <input
            name='image'
            type='file'
            onChange={(e) => uploadImage(e)}
            placeholder='meal image'
          />
          <div className='flex space-between gap-6'>
            <button
            // className='rounded-lg'
              style={{border:"1px solid", borderRadius:"10px", padding:"0 8px"}}
              type='submit'
              onClick={handleSubmit}
            >
              Add
            </button>
            <button
              className='rounded-lg'
              style={{border:"1px solid", padding:"0 10px", borderRadius:"10px"}}
              onClick={() => {
                setShowAddForm((prev) => !prev);
              }}
              >
              Cancel
            </button>
          </div>
          
        </form>
      )}
      <div>
        <div className='shadow-2xl py-5' style={{display: "flex", flexWrap:"wrap", flexDirection:"row", gap:"1rem", justifyContent:"space-around", width:"85%", margin:"0 auto", borderRadius:"8px"}}>
          {localData?.map((foodItem) => {
            
            return (
              <div >
                <div key={foodItem.name} className="rounded-lg bg-gray-300 border-solid" style={{padding:"10px", width:"300px"}} >
                  <img className='w-72 h-52' src={foodItem.image} alt={foodItem.image}/>
                  <h3><b>{foodItem.name}</b></h3>
                  <span> {foodItem.price} </span>
                  <p> {foodItem.description} </p>
                  <div className='flex gap-5'>
                    <button className="bg-red-500 px-5 rounded-lg">Order</button>
                    <button className="bg-red-500 px-6 py-2 rounded-lg"
                    onClick={() => handleDelete(foodItem.name)}
                    >Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}