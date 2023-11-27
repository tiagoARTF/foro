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
    <div className="container mx-auto mt-5 p-5 bg-white rounded-md shadow-md">
  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
    Encuentra Tu Lectura Perfecta
  </h1>
  <input
    className="w-full p-3 border rounded-md mb-4"
    type="text"
    placeholder="Buscar libro"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {libros.length === 0 ? (
      <p className="col-span-3 text-center">No se encontraron resultados.</p>
    ) : (
      libros.map((libro) => (
        <div key={libro._id} className="w-full md:w-1/3 p-4">
          <Link to={`/libros/${libro._id}`} className="text-decoration-none">
            <div className="card h-96 shadow">
              <img
                src={libro.portada}
                className="card-img-top object-cover h-64 w-full"
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
