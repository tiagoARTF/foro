import "../styles/navbar.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/firebase-auth";
import { FaRegComments } from 'react-icons/fa'
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    window.location.reload();
    localStorage.removeItem("user");
  };

  return (
    <header className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='navbar__wrapper container-fluid'>
        <img onClick={() => navigate('/')}
            src="src/assets/logo.png"
            alt="Comentarios"
            width="100px"   
        />
        <nav className='nav'>
          <ul className='nav__list navbar-nav me-auto mb-2 mb-lg-0'>
            {user ? (
              <>
                <li className='nav-item'>
                  <a className='nav-link' onClick={handleSignOut}>Cerrar Sesión</a>
                </li>
                <li className='nav-item user'>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      referrerPolicy='no-referrer'
                      className='avatar rounded-circle'
                      title={user.email}
                    />
                  ) : (
                    user.name.charAt(0)
                  )}
                </li>
              </>
            ) : (
              <>
              <li className='nav-item'>
                <button className='btn btn-outline-light' onClick={() => navigate('/sign-in')}>
                    Iniciar Sesión
                </button>
              </li>
              <li className='nav-item'>
                <button className='btn btn-outline-light' onClick={() => navigate('/sign-up')}>
                    Registrarse
                </button>
              </li>

              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};


export default Navbar;