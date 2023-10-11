import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/DetalleInteraction.css'; // Estilos CSS personalizados


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
      {/* Encabezado */}
      <header className="header">
        <div className="logo" style={{padding: '0px'}}>
          <img src="../src/assets/logo.png" alt='logo' />
        </div>
        <div className="busqueda">
          <input type="text" placeholder="Buscar libros" />
        </div>
        <div className="perfil" style={{width: '50px'}}>
          <img src="../src/assets/person-circle.svg" alt="Perfil" />
        </div>
      </header>

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

        {/* Comentarios */}
        <div className="comentarios">
          <div className='comentario'>
            <div className='informacion-usuario'>
              <img src='../src/assets/person-circle.svg' alt='Usuario'/>
              <p className="nombre-usuario">Nombre de Usuario</p>
              <p className="fecha-comentario">Fecha del Comentario</p>
            </div>
            <p className="texto-comentario">
              Este es un comentario sobre el libro
            </p>
            <div className='opciones-comentario'>
              <a href="#">Responder</a>
              <a href="#">Votar arriba</a>
              <a href="#">votar abajo</a>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de navegación */}
      

      {/* Enlace para volver a la lista de libros */}
      <Link to="/libros">Volver a la lista de libros</Link>
    </div>
  );
}

export default DetallesLibro;

