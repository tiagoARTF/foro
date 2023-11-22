import React, { useState } from 'react';
import '../styles/formen.css'; // Asegúrate de importar tus estilos CSS personalizados

const FormularioClubLectura = () => {
  const [nombre, setNombre] = useState('');
  const [linkDiscord, setLinkDiscord] = useState('');
  const [fechaReunion, setFechaReunion] = useState('');
  const [clubs, setClubs] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleMostrarFormulario = () => {
    setMostrarFormulario(true);
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoClub = { nombre, linkDiscord, fechaReunion };
    setClubs([...clubs, nuevoClub]);
    setNombre('');
    setLinkDiscord('');
    setFechaReunion('');
    handleOcultarFormulario();
  };

  return (
    <div className="container-club">
      <button onClick={handleMostrarFormulario}>+</button>
      {mostrarFormulario && (
        <div className="alert-modal show-modal">
          <div className="modal-content">
            <form className='label' onSubmit={handleSubmit}>
              <label>
                Nombre del Club:
                <input className='inpu' type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </label>
              <label>
                Link de Discord:
                <input className='inpu' type="text" value={linkDiscord} onChange={(e) => setLinkDiscord(e.target.value)} />
              </label>
              <label>
                Fecha de Reunión:
                <input className='inpu' type="date" value={fechaReunion} onChange={(e) => setFechaReunion(e.target.value)} />
              </label>
              <button type="submit" className="modal-control">Crear Club</button>
              <button type="button" className='modal-control' onClick={handleOcultarFormulario}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
      {/* Mostrar la lista de clubs */}
      <ul className="club-list">
      {clubs.map((club, index) => (
          <li key={index} className="club-item">
            <strong>Nombre:</strong> {club.nombre},{' '}
            <strong>Discord:</strong>{' '}
            {club.linkDiscord && (
              <a href={club.linkDiscord} target="_blank" rel="noopener noreferrer">
                {club.linkDiscord}
              </a>
            )}, <strong>Fecha:</strong> {club.fechaReunion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormularioClubLectura;
