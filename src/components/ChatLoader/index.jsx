import React, { useState, useRef, useEffect } from 'react'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { IoMdArrowDropleft } from 'react-icons/io'
import { AiOutlineSend } from 'react-icons/ai'
import InputEmoji from 'react-input-emoji'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AddMessage } from '../../collection/chat'
import './style.css'
function ChatLoader ({
  user,
  messages,
  currentUser,
  setCurrentUser,
  socket,
  logout,
  smallDevice,
  setOpenChat
}) {
  const Navigate = useNavigate()
  const [textMessage, setTextMessage] = useState('')
  const [userMessage, setMessages] = useState([])
  const [recievedMessage, setRecievedMessage] = useState({})
  const [current_User, setCurrent_User] = useState(currentUser)
  const scrollLast = useRef()
  const toast_option = {
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('CHAT_APP_USER'))
    if (!user) {
      Navigate('../auth')
    }
  }, [current_User])

  useEffect(() => {
    if (socket.current) {
      socket.current.on('recieve-message', newMessage => {
        if (newMessage.message !== '') {
          console.log('newmessage', newMessage)
          setRecievedMessage(newMessage)
        }
      })
    }
  }, [])
  useEffect(() => {
    setMessages(messages)
  }, [messages])
  useEffect(() => {
    if (recievedMessage && recievedMessage !== {}) {
      if (recievedMessage.from == user._id) {
        setMessages([...userMessage, recievedMessage])
      } else if (
        recievedMessage !== {} &&
        recievedMessage.from &&
        recievedMessage.from !== user._id
      ) {
        console.log('in another user')
        toast.success(
          `new message recieved from ${recievedMessage.userName}`,
          toast_option
        )
      }
      setRecievedMessage({})
    }

    setRecievedMessage()
  }, [recievedMessage])
  const handleSend = () => {
    const textedMessage = {
      from: currentUser._id,
      to: user._id,
      message: textMessage
    }
    //adding to mongodb
    AddMessage(textedMessage, setMessages)
    //adding to socket server
    socket.current.emit('send-message', {
      ...textedMessage,
      userName: currentUser.userName
    })
    setMessages([
      ...userMessage,
      { currentMessage: true, message: textedMessage.message }
    ])
    setTextMessage('')
  }
  useEffect(() => {
    scrollLast.current &&
      scrollLast.current.scrollIntoView({ behavior: 'smooth' })
  }, [userMessage])

  const handleLogOut = () => {
    logout(currentUser._id)
    localStorage.clear()
    setCurrent_User('')
    setCurrentUser('')
  }
  return (
    <div className='chat_loader'>
      <div className='container'>
        <div className='row'>
          <div className='chat_message_container'>
            <div className='chat_header'>
              <div className='row'>
                <div className='title'>
                  {smallDevice && (
                    <div
                      className='back logout'
                      onClick={() => window.location.reload()}
                    >
                      <IoMdArrowDropleft />
                    </div>
                  )}
                  <div className='image-container'>
                    <img
                      src={`data:image/svg+xml;base64,${user.profileImage}`}
                      alt=''
                    />
                    <p>{user?.userName}</p>
                  </div>
                  <div className='logout' onClick={handleLogOut}>
                    <AiOutlinePoweroff />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='chat_messages'>
              <div className='container'>
                <div className='row'>
                  <div className='chat_message chat_slider'>
                    {userMessage &&
                      userMessage.map(message => {
                        return (
                          <div
                            className={`message_chat ${message.currentMessage ==
                              true && 'own_message'}`}
                            ref={scrollLast}
                          >
                            <span className='text'>{message.message}</span>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className='chat_input'>
              <div className='row'>
                <div className='react-input'>
                  <InputEmoji
                  className="col-12"
                    theme={'dark'}
                    onChange={setTextMessage}
                    value={textMessage}
                    cleanOnEnter
                    onEnter={handleSend}
                    height={20}
                    fontSize={14}
                  />
                  <AiOutlineSend className='send-icon' onClick={handleSend} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ChatLoader
