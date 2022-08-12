import React from 'react'
import rorbot from '../../assets/robot.gif'
import './style.css'
function WelcomePage({currentUser,user}) {
  return (
    <div className='welcome'>
        <div className="container">
            <div className="row">
                <div className="welcome_loader">
                    <img src={rorbot} alt="" />
                    <h4>welcome....{currentUser?.userName}</h4>
                    <span>please select a Chat To Start Conversation </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WelcomePage