
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthLoader from './components/Auth/auth';
import AvatarSetup from './components/Avatar/avatarsetup';
import ChatPage from './components/chat';
function App() {
  return (
    <div className="App">
       <BrowserRouter >
          <Routes >
            <Route path='/' element={<ChatPage/>}></Route>
            <Route path='/auth' element={ <AuthLoader/> } ></Route>
            <Route path='/avatar-setup' element={<AvatarSetup/>} ></Route>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
