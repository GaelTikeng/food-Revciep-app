import React from 'react';
import "./popup.css"

export default function Popup (props) {

  return (
    <div className='popup-box'>
      <div className='box'>
        <span className='close-icon' onClick={props.handleClose}>X</span>
        {props.content}
      </div>
    </div>
  );
}