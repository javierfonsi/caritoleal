import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom' 
import { useForm } from 'react-hook-form';
import axios from 'axios'
import '../styles/styles-login.css'

const Login = () => {

    const { register, handleSubmit } = useForm()
    const [ loginError, setLoginError] = useState("")
    const navigate = useNavigate()

    const submit = data => {
     //console.log(data)
      axios.post('https://ecommerce-exercise-backend.herokuapp.com/login/', data)
        .then(res => {
          localStorage.setItem("token", res.data.access)
          navigate('/shop')
      })
      .catch(() => setLoginError("Credenciales incorrectas"))         
    }


  return (
      <div className='container-login'>
        <div className='card-form'>
          <h2>Bienvenido a su tienda de accesorios</h2>
          <h1>Carito Leal</h1>
          <h3>Iniciar sesión </h3>
          
          <form className='form' onSubmit={handleSubmit(submit)}>
            <div className='inputs-container'>
              <label htmlFor='email'>email</label>
              <input 
                {...register("email")}
                type="email"
                required
                placeholder='email@email.com'
              />
            </div>
            <div className='inputs-container'>
              <label htmlFor='password'>password</label>
              <input 
                {...register("password")}
                type="password"
                required
                placeholder='password'
              />
            </div>
            <button className='btn-login'>LOGIN</button>
          </form>
          <h4>{loginError}</h4>
        </div>
      </div>
  )};

export default Login;

