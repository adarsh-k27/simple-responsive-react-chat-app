import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetAllUser } from '../../collection/auth'
import { FindMessages } from '../../collection/chat'
import ChatLoader from '../ChatLoader'
import Contacts from '../Contacts'
import WelcomePage from '../welecome paage'
import  {io}  from 'socket.io-client'
import './style.css'
import { AiOutlineLogout } from 'react-icons/ai'

function ChatPage () {
  const Navigate = useNavigate()
  const socket = useRef()
  const [allUsers, setAllUsers] = useState([])
  const [currentUser, setCurrentUser] = useState('')
  const [openChat, setOpenChat] = useState('')
  const [winWidth, setWinWidth] = useState(window.innerWidth)
  const [smallDevice, setSmallDevice] = useState(false)
  const [messages, setMessages] = useState([])
  const [logout,setLogout]=useState(false)
  let logInUser;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('CHAT_APP_USER'))
    logInUser={...user}
    setCurrentUser(user)
    if (!user) {
      Navigate('/auth')
    } else {
      GetAllUser(user?._id, setAllUsers)
    }
  }, [])

  useEffect(()=>{
    socket.current=io('https://react-talk-time-chat.herokuapp.com/')
    socket.current.emit('add-user',currentUser && currentUser._id)
    if(logout){
      console.log("logout happpen");
      console.log("logoutUser",logInUser);
      socket.current.emit('logout-user',logout)
    }
  },[currentUser])

  const changeSize = () => {
    if (window.innerWidth <= 600) {
      setSmallDevice(true)
    } else {
      setSmallDevice(false)
    }
  }
  useEffect(() => {
    changeSize()
    if (openChat !== '') {
      FindMessages({ from: currentUser._id, to: openChat._id }, setMessages)
    }
  }, [openChat])

  return (
    <div className='chat_page'>
      <div className='container'>
        <div className='row'>
          <div
            className={`col-12 col-md-4 chat_section_1 ${openChat &&
              smallDevice ?
              'hidden_chat' : "show_chat"}`}
          >
            <div className='row chat_sec'>
              {allUsers && (
                <Contacts
                  users={allUsers}
                  currentUser={currentUser}
                  openChat={setOpenChat}
                  socket={socket}
                  logout={logout}
                />
              )}
            </div>
          </div>
          <div
            className={`col-12 col-md-8 chat_section_2 ${openChat !== "" &&
              'show_chat' }`}
          >
            <div className='row'>
              {!openChat || !smallDevice &&  (
                <WelcomePage currentUser={currentUser} user={openChat} />
              ) 
              } 
              {
                openChat && 
                <ChatLoader
                  user={openChat && openChat}
                  setOpenChat={setOpenChat}
                  messages={messages && messages}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  socket={socket}
                  logout={setLogout}
                  smallDevice={smallDevice}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
