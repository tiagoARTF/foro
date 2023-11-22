import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/libros.css';
import Navbar from './components/Navbar';

function Libros() {
  const [libros, setLibros] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener todos los libros
    fetch('http://localhost:3001/libros')
      .then((response) => response.json())
      .then((data) => {
        setLibros(data);
      })
      .catch((error) => {
        console.error('Error al obtener los libros', error);
      });
  }, []);

  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener los libros según el término de búsqueda
    const apiUrl = searchQuery ? `http://localhost:3001/libros/buscar/${searchQuery}` : 'http://localhost:3001/libros';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLibros(data);
      })
      .catch((error) => {
        console.error('Error al obtener los libros:', error);
      });
  }, [searchQuery]);

  return (
    <div className='dd'>
    <Navbar/>
    <div className="container mt-4 p-5">
      <h1 className="text-center p-5">Listado de Libros</h1>
      <input className='p-2'
        type="text"
        placeholder="Buscar libros"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="row row-cols-1 row-cols-md-3">
        {libros.length === 0 ? (
          <p>No se encontraron resultados.</p>
        ) : (
          libros.map((libro) => (
            <div key={libro._id} className="col-lg-3 col-mb-4 col-sm-6 mb-4 p-4">
              <Link to={`/libros/${libro._id}`} className="text-decoration-none">
                <div className="card h-10 shadow">
                  <img
                    src={libro.portada}
                    className="card-img-top d-flex align-items-center justify-content-center img-fluid"
                    alt={`Portada de ${libro.titulo}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{libro.titulo}</h5>
                    <p className="card-text">Autor: {libro.autor}</p>
                    <p className="card-text">Año de Publicación: {libro.publicacion}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default Libros;
