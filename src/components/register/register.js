import './register.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import {useState, useEffect, useRef, useReducer} from 'react';

const reducer = (state, action) => {
    switch(action.type) {
        case 'user':
            return {...state, user: action.payload};

        case 'password':
            return {...state, password: action.payload};

        case 'email':
            return {...state, email: action.payload};

        case 'recovery':
            return {...state, recovery: action.payload};
        default:
            throw new Error();        
    }
}

export default function Register ({handleRegister}) {
    const [state, dispatch] = useReducer(reducer, {user:'', password:'', email:'',recovery:''})
    const ref = useRef(null);

    const sendRegister = (event) => {
        event.preventDefault();
        handleRegister(state.user, state.password, state.email, state.recovery);
    }
    useEffect(() => {
        const element = ref.current;
        const handleEnter = (event) => {
            if(event.key==='Enter'){
                event.preventDefault();
            }
        }
        element.addEventListener('keypress', handleEnter);
        return () => {
            element.removeEventListener('keypress', handleEnter);
          };
      }, [state.user, state.password, state.email, state.recovery]);



    return (
        <>        
            <form ref={ref} className="form-register">

                <div className="form-register-div">
                    <label><FontAwesomeIcon icon={icon({name: 'user'})} /></label>
                    <input value={state.user} onChange={(event) => dispatch({type:'user', payload: event.target.value})} placeholder='Usuario' />
                </div>

                <div className="form-register-div">
                    <label><FontAwesomeIcon icon={icon({name: 'lock'})} /></label>
                    <input value={state.password} onChange={(event) => dispatch({type:'password', payload: event.target.value})} type="password" placeholder='Contraseña' />
                </div>

                <div className="form-register-div">
                    <label><FontAwesomeIcon icon={icon({name: 'envelope'})} /></label>
                    <input value={state.email} onChange={(event) => dispatch({type:'email', payload: event.target.value})} placeholder='Email' />
                </div>

                <div className="form-register-div">
                    <label><FontAwesomeIcon icon={icon({name: 'envelope'})} /></label>
                    <input value={state.recovery} onChange={(event) => dispatch({type:'recovery', payload: event.target.value})} placeholder='Email de recuperación' />
                </div>

                <div className="form-register-div">
                    <input onClick={sendRegister} type="submit" value="REGISTRARSE"/>
                </div>

                <div className="form-register-div">
                    <p>¿Ya tienes cuenta? <a href='/login'>Inicia sesión</a></p> 
                </div>
                
            </form>
        </>
    )
}