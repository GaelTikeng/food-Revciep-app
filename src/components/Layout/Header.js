import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/popup/popup';
import './header.css';

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
    <header className='header'>

      {isOpen && <Popup
        content = {
          <>
            <h1>hlleo</h1>
          </>}
          handleClose = {togglePopup}
      />}

      <h1 className='h1'>Astride's <span>food</span></h1>
      <div className='flex gap-6  pr-12 cursor-pointer'>
        <p className='paragraph'>
          <Link to="/home">Home</Link>
        </p>
        <p className='paragraph'>
          About
        </p>
        <p className='paragraph'>
          Services
        </p>
        <p className='paragraph'>
          contact
        </p>
        <button
          onClick={handleSignup}
          type='submit' className='botton'>Login</button>
      </div>
      

    </header>
  )
}