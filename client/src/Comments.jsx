import { useState } from 'react';

function Comentarios() {
  const [comentarios, setComentarios] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nuevoComentario, setNuevoComentario] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crea un nuevo comentario y agrégalo a la lista
    const comentario = {
      nombre: nombreUsuario,
      texto: nuevoComentario,
      fecha: new Date().toLocaleDateString(),
    };

    setComentarios([...comentarios, comentario]);

    // Limpia los campos del formulario
    setNombreUsuario('');
    setNuevoComentario('');
  };

  return (
    <div className="foro">
      <h1>Foro de Libros</h1>

      <div className="comentarios">
        {comentarios.map((comentario, index) => (
          <div key={index} className="comentario">
            <div className="informacion-usuario">
              <img src="imagen-usuario.jpg" alt={comentario.nombre} />
              <p className="nombre-usuario">{comentario.nombre}</p>
              <p className="fecha-comentario">{comentario.fecha}</p>
            </div>
            <p className="texto-comentario">{comentario.texto}</p>
          </div>
        ))}
      </div>

      <form className="formulario-comentario" onSubmit={handleSubmit}>
        <h2>Deja un Comentario</h2>
        <div className="campo">
          <label htmlFor="nombre-usuario">Nombre de Usuario:</label>
          <input
            type="text"
            id="nombre-usuario"
            name="nombre-usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="comentario">Comentario:</label>
          <textarea
            id="comentario"
            name="comentario"
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Publicar Comentario</button>
      </form>
    </div>
  );
}

export default Comentarios;
