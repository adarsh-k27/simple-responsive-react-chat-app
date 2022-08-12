import React, { useState,useEffect } from 'react'
import logo from '../../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import {Auth_Login, Auth_Register} from '../../collection/auth'
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
import { useNavigate } from 'react-router-dom';
function AuthLoader () {
  
  const [isSignUp, setSignUp] = useState(false)
  const Navigate=useNavigate()
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirm: ''
  })
  const toast_option = {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme:"dark"
  }
  let validate;
  useEffect(()=>{
    const user=localStorage.getItem('CHAT_APP_USER')
    if(user){
     Navigate('../avatar-setup')
    }
  },[isSignUp])
  //Navigation with login signup
  const Navigation = e => {
    setSignUp(prev => !prev)
    setFormData("")
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(isSignUp){
       validate=ValidationSignUp()
       
    }
    else{
      validate=ValidationLogin()
      
    }

    if(validate){
      if(isSignUp) {
        Auth_Register(formData,setSignUp)
        
      }
      else{
        const{email,confirm,...otherData}=formData
        Auth_Login(otherData,Navigate)
      }
    }
    
  }
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //validation
  const ValidationSignUp = () => {
    if (
      formData.email=="" ||
      formData.confirm=="" ||
      formData.userName=="" ||
      formData.password==""
    ) {
      toast.error("Fields Are Not Full",toast_option)
    }

    if(formData.password !== formData.confirm){
      toast.error("password And Confirm Password Is Not Same",toast_option)
    }
    else{
      return true
    }
  }
  const ValidationLogin=()=>{
    if(formData.userName == "" || formData.password == ""){
      toast.error("Fields Are Not Full",toast_option)
    }
    else{
      return true
    }
  }
  //login
  const LoginRender = () => {
    return (
      <>
        <div className='form-input'>
          <input
            type='text'
            placeholder='Email'
            name='userName'
            onChange={handleChange}
            value={FormData.userName}
          />
        </div>
        <div className='form-input'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={FormData.password}
          />
        </div>
      </>
    )
  }
  //sign uP
  const signUpRender = () => {
    return (
      <>
        <div className='form-input'>
          <input
            type='text'
            placeholder='UserName'
            name='userName'
            onChange={handleChange}
            value={FormData.userName}
          />
        </div>
        <div className='form-input'>
          <input
            type='text'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={FormData.email}
          />
        </div>
        <div className='form-input'>
          <input
            type={'password'}
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={FormData.password}
          />
        </div>
        <div className='form-input'>
          <input
            type={'password'}
            placeholder='Confirm Password'
            name='confirm'
            onChange={handleChange}
            value={FormData.password}
          />
        </div>
      </>
    )
  }

  return (
    <div className='auth_loader'>
      <div className='container'>
        <div className='row'>
          <div className='auth_element'>
            <div className='logo_section'>
              <img src={logo} alt='' />
              <h4>SKIPPY</h4>
            </div>
            <div className='auth_form_section'>
              <div className='auth_form'>
                <form>
                  {isSignUp ? signUpRender() : LoginRender()}
                  <div className='form-btn'>
                    <button onClick={handleSubmit}>
                      {isSignUp ? 'SignUp' : 'LogIn'}
                    </button>
                  </div>
                  <div className='navigation' onClick={Navigation}>
                    <span>
                      {isSignUp
                        ? 'Already Have An Account'
                        : 'You Dont Have An Account yet'}{' '}
                    </span>{' '}
                    <span>{isSignUp ? 'Login' : 'SignUp'}</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AuthLoader
