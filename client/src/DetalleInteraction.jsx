import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/DetalleInteraction.css'; 
import CommentSection from "../src/components/CommentSection/CommentSection";
import Navbar from './components/Navbar';
import { FaArrowLeft } from 'react-icons/fa';
//import FormularioClubLectura from './components/clublectura';

//import ClubDeLectura from '../src/components/clublectura';


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
  

  
    const handleButtonClick = () => {
      console.log('Botón de Tienda clicado');
    };

  

  return (
    <div className="detalles-libro">
      <Navbar />
      <div className="cuerpo d-flex justify-content-center">
        <button className='back-btn' onClick={() => (window.location.href = '/libros')}>
          <FaArrowLeft  className='back-icon' />
        </button>
      
        <div className="portada">
          <img src={libro.portada} alt={`Portada de ${libro.titulo}`} />
        </div>

        <div className="detalles">
          <h1>{libro.titulo}</h1>
          <p style={{fontSize: '25px'}}><strong>Autor:</strong> {libro.autor}</p>
          <p><strong> Año de Publicación:</strong> {libro.publicacion}</p>
          <p><strong>Descripción del libro:</strong> {libro.descripcion}</p>
          <a href={libro.tienda} target="_blank" rel="noopener noreferrer">
            <button className='vb btn btn-secondary send-btn d-inline-block mr-2' onClick={handleButtonClick}>
              Conseguir
            </button>
          </a>
          <a href={libro.previa} target="_blank" rel="noopener noreferrer">
            <button className='vb btn btn-secondary send-btn d-inline-block mr-2' onClick={handleButtonClick}>
              Vista Previa
            </button>
          </a>
        </div>

        <CommentSection _id={_id} />
        
        
      </div>

    
    </div>
  );
}

export default DetallesLibro;

