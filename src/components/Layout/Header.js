import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/popup/popup';

export default function Header () {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('./loginForm');
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className='flex gap-6 bg-gray-300 shadow-md fixed z-10 w-full top-0'>

      {isOpen && <Popup
        content = {
          <>
            <h1>hlleo</h1>
          </>}
          handleClose = {togglePopup}
      />}

      <h1 style={{fontFamily: "-moz-initial", fontSize:"25px"}} className='flex-1 py-5 pl-20'>Astride's <span className='text-red-500'>food</span></h1>
      <div className='flex gap-6  pr-12 cursor-pointer'>
        <p className='py-5 underline'>
          <Link to="/home">Home</Link>
        </p>
        <p className='py-5 underline'>
          <Link to="/About">About</Link>
        </p>
        <p className='py-5 underline'>
          <Link to="/Services">Services</Link>
        </p>
        <p className='py-5 underline'>
          <Link to="/contact">contact</Link>
        </p>
        <button
          onClick={handleSignup}
          type='submit' className='bg-red-500 rounded-tr-lg rounded-bl-lg h-10 p-2 mt-3 shadow-lg'>Login</button>
      </div>
      

    </header>
  )
}