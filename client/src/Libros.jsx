import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/libros.css';

function Libros() {
  const [libros, setLibros] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener los libros cuando el componente se monta
    fetch('http://localhost:3001/libros') // Asegúrate de usar la URL correcta
      .then((response) => response.json())
      .then((data) => {
        setLibros(data); // Actualiza el estado con los libros obtenidos
      })
      .catch((error) => {
        console.error('Error al obtener los libros', error);
      });
  }, []); // El segundo argumento vacío [] asegura que esto solo se ejecute una vez al montar el componente.


  useEffect(() => {
    const apiUrl = searchQuery ? `/libros/${searchQuery}` : '/libros/:query';

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Cambia a text para obtener la respuesta completa
        })
        .then((data) => {
            //console.log('Datos recibidos del servidor:', data);
            setLibros(JSON.parse(data)); // Intenta parsear la respuesta como JSON
        })
        .catch((error) => {
            console.error('Error al obtener los libros:', error);
        });
}, [searchQuery]);


  return (
    <div className="container mt-4">
      <h1 className="text-center p-3">Listado de Libros</h1>
      <input
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
            <div key={libro._id} className="col-lg-3 col-mb-4 col-sm-6 mb-4">
              <Link to={`/libros/${libro._id}`} className="text-decoration-none">
                {/* Envuelve todo el contenido de la tarjeta dentro del componente Link */}
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
                    {/* Otros detalles del libro */}
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
);

}

export default Libros;
