import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import logo from '../../assets/logo.svg'
import Contact from '../contact'
import './style.css'
function Contacts ({ users, openChat, socket, logout, currentUser }) {
  const [online, setOnline] = useState([])
  const [selectedChat, setSelected] = useState('')
  console.log("online",online);
  useEffect(() => {
    if (selectedChat !== '') {
      openChat(users[selectedChat])
    }
  }, [selectedChat])
  useEffect(() => {
    console.log("socket",socket);
    if (socket.current) {
      socket.current.on('get-online-users', online => {
        setOnline(online)
        
      })
    }
  }, [])
  const checkOnlineStatus = users => {
    const onlineStatus = online.length >= 0 && online.find(user => user.userId == users._id)
    return onlineStatus ? true : false
  }
  return (
    <div className='contacts'>
      <div className='container'>
        <div className='contact_title'>
          <div className='row'>
            <div className='logo_section'>
              <img src={logo} alt='logo of application' />
              <h4 className='text-light'>Skippy</h4>
            </div>
          </div>
        </div>
        <div className='contact_body'>
          <div className='row'>
            <div className='contact_body_container'>
              <div className=' contact_slider slider'>
                {users &&
                  users.map((user, index) => (
                    <Contact
                      user={user}
                      index={index}
                      setSelected={setSelected}
                      selectedChat={selectedChat !== '' && selectedChat}
                      online={ online && checkOnlineStatus(user)}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className='user-chat'>
            <div className='row'>
              <div className='self_contact_wrapper'>
                <img
                  src={`data:image/svg+xml;base64,${currentUser.profileImage}`}
                  alt='individual contact'
                />
                <h5 className='text-light'>{currentUser.userName}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts
