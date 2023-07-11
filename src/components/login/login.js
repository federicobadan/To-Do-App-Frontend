import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login ({handleLogin, handleSession}) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const ref = useRef(null);
    const navigate = useNavigate();
    let isMounted = false;
    

    const sendLogin = (event) => {
        event.preventDefault();
        handleLogin(user, password);
    }

    useEffect(()=>{
        if (isMounted===false){
            handleSession(() => {
                navigate('/');
            });
        }
        isMounted=true;
    }, []);

    useEffect(() => {
        const element = ref.current;
        const handleEnter = (event) => {
            if(event.key==='Enter'){
                sendLogin(event);
            }
        }
        element.addEventListener('keypress', handleEnter);
        return () => {
            element.removeEventListener('keypress', handleEnter);
          };
      }, [user, password]);

    return (
        <>
            <form ref={ref} className="form-login">
                <div className="form-login-div">
                    <label><FontAwesomeIcon icon={icon({name: 'user'})} /></label>
                    <input value={user} onChange={(event) => setUser(event.target.value)} placeholder='Usuario' />
                </div>
                <div className="form-login-div">
                    <label><FontAwesomeIcon icon={icon({name: 'lock'})} /></label>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder='Contraseña' />
                </div>
                <div className="form-login-div">
                    <input onClick={sendLogin} type="submit" value="INICIAR SESIÓN"/>
                </div>
                <div className="form-login-div">
                    <p>¿No tienes cuenta? <a href="/signup">Crea una ahora</a></p>
                </div>
            </form>
        </>
    )
}
