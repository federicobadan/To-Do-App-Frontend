import './App.css';
import Container from './components/tasks container/container.js';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Login from './components/login/login.js'
import Register from './components/register/register.js'
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const navigate = useNavigate();

  const registerUser = async (user, password, email, recoveryEmail) => {
    axios.post(`http://localhost:3001/signup`, {username:`${user}`, password: `${password}`, email:`${email}`, recoveryEmail:`${recoveryEmail}`})
        .then(response => {
          toast.success("Register successful");
          navigate('/login');
        })
        .catch(error => {
          console.error(error);
          toast.error("An error was produced during register")
        });
  }

  const loginUser = async (user, password) => {
    axios.post(`http://localhost:3001/login`, {username:`${user}`, password: `${password}`})
        .then(response => {
          toast.success("Login successful");
          localStorage.username = response.data.username;
          localStorage.email = response.data.email;
          localStorage.token = response.data.token;
          navigate("/");
        })
        .catch(err => {
          console.error(err);
          toast.error("Error");
        });
  }

  const checkSession = async (returnTrue) => {

    const currentPath = window.location.pathname;
    const localStorageData = {
      'username': localStorage.getItem("username"),
      'email': localStorage.getItem("email"),
      'token': localStorage.getItem("token")
    }

    axios.get(`http://localhost:3001/user-data?username=${localStorage.username}`,  {headers:{Authorization:`${localStorageData.token}`}})
        .then(response => {
          returnTrue();
        })
        .catch(error => {
          console.error(error);
          if (error.response.status === 401){
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("token");

            if(currentPath !== '/login' && currentPath !== '/signup'){
              navigate("/login");
            }
          }
        })
  }

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Container handleSession={checkSession} />}></Route>
        <Route exact path='/login' element={<Login handleSession={checkSession} handleLogin={loginUser} />}></Route>
        <Route exact path='/signup' element={<Register handleSession={checkSession} handleRegister={registerUser} />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
