import React from 'react'
import { useState } from 'react'
import './style.css'
function Contact ({ user, setSelected, selectedChat, index,online}) {

  const handleClicked=()=>{
    setSelected(index)
  }
  console.log("online or not",online);
  return (
    <div
      className={` ${selectedChat !== index ? 'Contact' : 'selected_chat'}`}
      onClick={handleClicked}
    >
      <div className='row'>
        <div className='contact_wrapper'>
          <img
            src={`data:image/svg+xml;base64,${user.profileImage}`}
            alt='individual contact'
          />
          <h5 className='text-light'>{user.userName}</h5>
        </div>
        <div className="online">
           <div className={`${online && "online_dot"}`}></div>
           <span>{online? "Online" :"Offline"}</span>
        </div>
      </div>
    </div>
  )
}

export default Contact
