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
    }
    catch (error) {
      console.error(error);
    }
    finally {
      console.log(response.data)
    }
  }
  const loginUser = async (user, password) => {
    const localStorageData = {
      'username': localStorage.getItem("username"),
      'email': localStorage.getItem("email"),
      'token': localStorage.getItem("token")
    }
    let response = null;
    if (localStorageData.username===null && localStorageData.email===null && localStorageData.token===null){
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
    else{
      try{
        response = await axios.post(`http://localhost:3001/login`,  {username:`${localStorageData.username}`, email:`${localStorageData.email}`, token:`${localStorageData.token}`})
      }
      catch (error) {
        console.error(error);
      }
      finally {
        console.log(response.data);
        if (response.data){
          navigate("/");
        }
        if (response.data === false){
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          localStorage.removeItem("token");
        }
      }
    }
}
  return (
    <Routes>
      <Route exact path='/' element={<Container />}></Route>
      <Route exact path='/login' element={<Login handleLogin={loginUser} />}></Route>
      <Route exact path='/signup' element={<Register handleRegister={registerUser} />}></Route>
    </Routes>
  );
}

export default App;
