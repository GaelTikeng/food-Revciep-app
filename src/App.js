import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import LandingPage from './pages/landingPage/LandingPage';
import ItemDetails from './pages/item-description/itemDescription';
import OrderFood from './pages/oderFood/order';
import SignupForm from './pages/signup';
import LoginForm from './components/loginForm';
import Account from './pages/accountPage/accountPage';
import { FoodProvider } from './utils/context';
import { useLocalStorage } from './utils/useLocalStorage';
// import CustomizedDialogs from './components/dialogue';



// const productDatas = JSON.parse(localStorage.getItem("foodData"));
// console.log(productDatas);


function App () {
  const { value, setValue } = useLocalStorage("foodItem", []);
  
  return (
    <FoodProvider value={{ value, setValue }} >
      <Router>
        <Header />
        {/* <CustomizedDialogs /> */}
        
        <Routes>
          <Route path='/:id/orderFood' element = {<OrderFood/>}/>
          <Route path="/loginForm" element = {<LoginForm />} />
          <Route path="/loginForm/signup" element={<SignupForm />}/>        
          <Route path='/' element={<LandingPage />} />
          <Route path="/item-description/:id" element = {<ItemDetails />}/>
          <Route path='/loginForm/signup/accountPage' element={<Account/>} />
          <Route path='/loginForm/accountPage' element={<Account/>} />
        </Routes>
      
      </Router>
    </FoodProvider>
    
  );

  
  
}

export default App;
