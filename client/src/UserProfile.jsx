//import  { useState, useEffect } from 'react';
//import axios from 'axios';
import {} from 'react';
import PropTypes from 'prop-types';

function UserProfile({ user }) {
  return (
    <header>
      <div className="logo">Tu Logo</div>
      <div className="search-bar">Barra de búsqueda</div>
      <div className="profile">
        {user ? (
          <div className="user-profile">
            <img src="ruta_de_la_imagen_del_perfil" alt="Avatar" />
            <span>{user.name}</span>
          </div>
        ) : (
          <button>Iniciar sesión</button>
        )}
      </div>
    </header>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    // Agrega otras propiedades si es necesario
  }),
};

export default UserProfile;
