import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'

function Signup(){
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/registro', {name, email, password: password})
        .then(result => {console.log(result)
          navigate('/login')
        
        })
        .catch(err=> console.log(err))
    }

  return(
    <div className=" signup-form d-flex justify-content-center align-items-center vh-100">
  <div className="caja p-3 rounded w-25">
    <h2 className="signup-title text-center">Registro</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email">
          <strong>Nombre</strong>
        </label>
        <input
          type="text"
          placeholder="Enter name"
          autoComplete="off"
          name="name"
          className="form-control rounded"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email">
          <strong>Email</strong>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          className="form-control rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">
          <strong>Contraseña</strong>
        </label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          className="form-control rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-success w-100 rounded">
        Registro
      </button>
      <a href='/client/src/Private.html' className=" parr text-center">Conoce nuestra política de privacidad</a>
      </form>
      <p className=" parr text-center">Ya tienes una cuenta?</p>
      <Link to="/login" className="btn btn-default border w-100 bg-light rounded text-decoration-none">
        Inicia Sesión
      </Link>
  </div>
</div>

  );
}

export default Signup;