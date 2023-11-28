import '../styles/formen.css'; 
import { useState, useEffect } from 'react';
import { db } from '../services/firebase'; 
import { collection, getDocs, addDoc, query, onSnapshot, doc } from 'firebase/firestore';

const FormularioClubLectura = ({ _id }) => {
  const [nombre, setNombre] = useState('');
  const [linkDiscord, setLinkDiscord] = useState('');
  const [fechaReunion, setFechaReunion] = useState('');
  const [horaReunion, setHoraReunion] = useState('');
  const [clubs, setClubs] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    // Obtén la referencia a la colección de clubs en Firestore específica para el libro (_id)
    const clubsCollection = collection(db, `clubs/${_id}/clubs`);

    // Escucha cambios en la base de datos y actualiza el estado cuando sea necesario
    const unsubscribe = onSnapshot(clubsCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setClubs(data);
    });

    // Limpia los oyentes de Firestore cuando el componente se desmonta
    return () => unsubscribe();
  }, [_id]);

  const handleMostrarFormulario = () => {
    setMostrarFormulario(true);
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoClub = { nombre, linkDiscord, fechaReunion, horaReunion };

    // Agrega el nuevo club a la colección de Firestore específica para el libro (_id)
    await addDoc(collection(db, `clubs/${_id}/clubs`), nuevoClub);

    setNombre('');
    setLinkDiscord('');
    setFechaReunion('');
    setHoraReunion('');
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
                Link de Reunión:
                <input className='inpu' type="text" value={linkDiscord} onChange={(e) => setLinkDiscord(e.target.value)} />
              </label>
              <label>
                Día de la reunión:
                <select value={fechaReunion} onChange={(e) => setFechaReunion(e.target.value)}>
                  <option value="lunes">Lunes</option>
                  <option value="martes">Martes</option>
                  <option value="miércoles">Miércoles</option>
                  <option value="jueves">Jueves</option>
                  <option value="viernes">Viernes</option>
                  <option value="sábado">Sábado</option>
                  <option value="domingo">Domingo</option>
                </select>
              </label>
              <label>
                Hora de Reunión:
                <input className='inpu' type="time" value={horaReunion} onChange={(e) => setHoraReunion(e.target.value)} />
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
            <br/><strong>Link:</strong>{' '}
            {club.linkDiscord && (
              <a href={club.linkDiscord} target="_blank" rel="noopener noreferrer">
                {club.linkDiscord}
              </a>
            )}, <br/><strong>Dia:</strong> {club.fechaReunion}
                <strong> Hora:</strong> {club.horaReunion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormularioClubLectura;