import axios from '../axios'
import {
  toast
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const toast_option = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark"
}
export const Auth_Register = async (form, state) => {
  try {

    const res = await axios.post('/api/auth/register', form)
    console.log(res.data);
    if (res.status == 200) {
      toast("User Registered", toast_option)
      localStorage.setItem("CHAT_APP_USER", JSON.stringify(res.data.user))
      state(false)
    }

  } catch (error) {
    toast.error(error.response.data.message, toast_option)
    console.log(error);
  }
}

export const Auth_Login = async (form,Navigate) => {
  try {
    console.log(form);
    const res = await axios.post('/api/auth/login', form)
    console.log(res.data);
    if (res.status == 200) {
      const {hashePassword,...user}=res.data.data.AlreadyREgistered
      await localStorage.setItem('CHAT_APP_USER',JSON.stringify(user))
      Navigate('../')
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message, toast_option)
  }
}

export const AvatarSetUpFn = async (id, avatar) => {
  try {
    const res = await axios.put(`/api/auth/set-avatar/${id}`, {
      profileImage: avatar
    })
    if (res.status == 200) {
      return
    }
  } catch (error) {
    toast.error("Error On Setting An Avatar", toast_option)
    console.log(error);
  }
}

export const GetAllUser = async (id,state) => {
  try {
    const res = await axios.get(`user/get-all-user/${id}`)
    console.log(res.data);
    if(res.status==200){
       state(res.data)
    }
    
  } catch (error) {
    console.log(error);
  }
}