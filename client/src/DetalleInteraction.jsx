import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/DetalleInteraction.css'; // Estilos CSS personalizados
import CommentSection from "../src/components/CommentSection/CommentSection";
import Navbar from './components/Navbar';


function DetallesLibro() {
  const { _id } = useParams();
  const [libro, setLibro] = useState({});


  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener los detalles del libro por su ID
    fetch(`http://localhost:3001/libros/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        setLibro(data); // Actualiza el estado con los detalles del libro obtenidos
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del libro', error);
      });
  }, [_id]);

 
 
  if (!libro) {
    return <div>Cargando...</div>;
  }
  

  

  return (
    <div className="detalles-libro">
      <Navbar />

      {/* Cuerpo */}
      <div className="cuerpo d-flex justify-content-center">
        {/* Portada */}
        <div className="portada">
          <img src={libro.portada} alt={`Portada de ${libro.titulo}`} />
        </div>

        {/* Detalles del libro */}
        <div className="detalles">
          <h1>{libro.titulo}</h1>
          <p style={{fontSize: '25px'}}><strong>Autor:</strong> {libro.autor}</p>
          <p><strong> Año de Publicación:</strong> {libro.publicacion}</p>
          <p><strong>Descripción del libro:</strong> {libro.descripcion}</p>
        </div>

        <CommentSection _id={_id} />
      </div>

      {/* Botones de navegación */}
      

      {/* Enlace para volver a la lista de libros */}
      <Link to="/libros">Volver a la lista de libros</Link>
    </div>
  );
}

export default DetallesLibro;

