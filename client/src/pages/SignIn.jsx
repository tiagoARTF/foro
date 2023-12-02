import "../styles/auth.css";
import React, {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import { FaArrowLeft } from 'react-icons/fa';
import {BarLoader} from "react-spinners";
//import {TiArrowBack} from "react-icons/ti";
import {login, signInWithGoogle} from "../services/firebase-auth";
import {Link, useNavigate} from "react-router-dom";
import {MdVisibilityOff, MdVisibility} from "react-icons/md";
import RedirectRoute from "../components/RedirectRoute";
import tuImagen from '../assets/dd.jpg';

const SignIn = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const googleSignIn = async () => {
        const res = await signInWithGoogle();
        if (res.user) {
            setError(res);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        setLoading(true);
        const res = await login(email.value, password.value);
        setLoading(false);

        if (!res.user) {
            setError(res);
        }
    };

    return (
        <RedirectRoute>
            <section className='auth'>
                <div className='wrapper'>
                    <button className='back-btn' onClick={() => navigate(-1)}>
                        <FaArrowLeft className='back-icon'/>
                    </button>
                    <div className='banner'>
                        <img src={tuImagen} alt='Descripción de la imagen'/>
                    </div>
                    <div className='auth-body'>
                        <form className='auth-form' onSubmit={handleSubmit}>
                            <h3 className='auth-title'>Bienvenido de Nuevo</h3>
                            {error ? (
                                <p className='error'>{error.error}</p>
                            ) : (
                                <p className='auth-desc'>Bienvenido! por favor llena los campos</p>
                            )}
                            <div className='input-group'>
                                <label htmlFor='username' className='label'>
                                    Email
                                </label>
                                <div className='input-container' data-error='enter valid email'>
                                    <input
                                        type='email'
                                        name='email'
                                        required
                                        pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                                        placeholder='Ingresa tu email'
                                        autoComplete='username'
                                        autoFocus='on'
                                        id='username'
                                    />
                                </div>
                            </div>
                            <div className='input-group'>
                                <label htmlFor='password' className='label'>
                                    Contraseña
                                </label>
                                <div className='input-container'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        required
                                        placeholder='Ingresa tu contraseña'
                                        min='6'
                                        autoComplete='current-password'
                                        id='current-password'
                                    />
                                    {!showPassword ? (
                                        <MdVisibilityOff className='pwd-icon' onClick={toggleShowPassword} />
                                    ) : (
                                        <MdVisibility className='pwd-icon' onClick={toggleShowPassword} />
                                    )}
                                </div>
                            </div>
                            <button className='auth-btn' type='submit'>
                                {loading ? (
                                    <div className='loader'>
                                        <BarLoader color='#fff' loading={loading} size={10} height={2} />
                                    </div>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </button>
                            <button className='google-btn' type='button' onClick={googleSignIn}>
                                <FcGoogle className='google-icon' />
                                Iniciar Sesión con Google
                            </button>
                            <span className='message'>
                                Aún no tienes una cuenta?{" "}
                                <Link to='/sign-up' className='link-to'>
                                    Registrarse
                                </Link>
                            </span>
                        </form>
                    </div>
                </div>
            </section>
        </RedirectRoute>
    );
};

export default SignIn;
