import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Buffer } from 'buffer'
import { Spin } from 'antd'
import 'antd/dist/antd.css'
import './style.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AvatarSetUpFn } from '../../collection/auth'
function AvatarSetup () {
  const api = 'https://api.multiavatar.com/456378'
  const [avatars, setAvatars] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(false)
  const Navigate = useNavigate()
  const toast_option = {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  }
  console.log(selectedAvatar)
  const AvatarLoading = async () => {
    let avatarData = []
    for (let i = 0; i < 5; i++) {
      const Image = await axios.get(`${api}${Math.round(
        Math.random() * 1000
      )}?apikey=iGoMKUeYBQb0L2
      `)
      let buffer = new Buffer(Image.data)
      avatarData.push(buffer.toString('base64'))
    }
    setAvatars(avatarData)
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (selectedAvatar == false) {
      return toast.error('please pick an avatar', toast_option)
    }

    const user = JSON.parse(localStorage.getItem('CHAT_APP_USER'))
    await AvatarSetUpFn(user._id, selectedAvatar.avatar)
    user.isProfile = true
    user.profileImage = selectedAvatar.avatar
    localStorage.setItem('CHAT_APP_USER', JSON.stringify(user))
    Navigate('/')
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('CHAT_APP_USER'))
    if (!user ) { 
      Navigate('../auth')
    }  if(!user.isProfile) {
      AvatarLoading()
    }
    else{
      Navigate('/')
    }
  }, [])

  return (
    <div className='avatar_setup'>
      <div className='container'>
        <div className='row'>
          <div className='avatar_container'>
            <Spin spinning={loading} size={'large'}></Spin>
            {avatars.length > 0 && (
              <div className='avtar-text'>
                <h3>Select An Avatar From Here....</h3>
              </div>
            )}

            <div className='avatar-wrap row'>
              {avatars &&
                avatars.map((avatar, index) => (
                  <div
                    className={`col-3 avatar ${selectedAvatar.index == index &&
                      'selected'}`}
                    onClick={() => setSelectedAvatar({ index, avatar })}
                  >
                    <img src={`data:image/svg+xml;base64,${avatar}`} alt='' />
                  </div>
                ))}
            </div>

            {avatars.length > 0 && (
              <div className='avtar-btn'>
                <button className='btn btn-primary' onClick={handleSubmit}>
                  Create Avatar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AvatarSetup
