import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sideMenu.css';



export default function SideMenu () {
  const myUser = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <Menu>
      <h1 style={{textAlign: "center", fontStyle: "italic"}} className='p-b'>Welcome</h1>
      <h1 className='text-2xl text-center'><b>{myUser.lastName}</b></h1>
      <h2>{myUser.email}</h2>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="#">
        About
      </a>
      <a className="menu-item" href="#">
        Services
      </a>
      <a className='bottom-10' href="/">
        Log out
      </a>
    </Menu>
  );
};