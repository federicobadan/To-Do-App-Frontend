import './App.css';
import Container from './components/tasks container/container.js';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Login from './components/login/login.js'
import Register from './components/register/register.js'
import axios from 'axios';

function App() {
  const navigate = useNavigate();

  const registerUser = async (user, password, email, recoveryEmail) => {
    let response=null;
    try{
      response = await axios.post(`http://localhost:3001/signup`, {username:`${user}`, password: `${password}`, email:`${email}`, recoveryEmail:`${recoveryEmail}`})
      navigate('/login');
    }
    catch (error) {
      console.error(error);
    }
  }

  const loginUser = async (user, password) => {
    let response = null;

    try{
      response = await axios.post(`http://localhost:3001/login`, {username:`${user}`, password: `${password}`})
    }

    catch (error) {
      console.error(error);
    }

    finally {
      console.log(response.data)
      localStorage.username = response.data.username;
      localStorage.email = response.data.email;
      localStorage.token = response.data.token;
      navigate("/");
    }

  }

  const checkSession = async (returnTrue) => {
    
    const currentPath = window.location.pathname;
    const localStorageData = {
      'username': localStorage.getItem("username"),
      'email': localStorage.getItem("email"),
      'token': localStorage.getItem("token")
    }

    let response = null;

    try{
      response = await axios.get(`http://localhost:3001/user-data?username=${localStorage.username}`,  {headers:{Authorization:`${localStorageData.token}`}})
      returnTrue();
    }
    catch (error) {
      console.error(error);
      if (error.response.status === 401){
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("token");

        if(currentPath !== '/login' && currentPath !== '/signup'){
          navigate("/login");
        }

      }
    }
  }
  return (
    <Routes>
      <Route exact path='/' element={<Container handleSession={checkSession} />}></Route>
      <Route exact path='/login' element={<Login handleSession={checkSession} handleLogin={loginUser} />}></Route>
      <Route exact path='/signup' element={<Register handleSession={checkSession} handleRegister={registerUser} />}></Route>
    
    </Routes>
  );
}

export default App;
