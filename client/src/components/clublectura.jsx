import '../styles/formen.css'; 
import { useState, useEffect } from 'react';
import { db } from '../services/firebase'; 
import { collection, getDocs, addDoc, query, onSnapshot, doc } from 'firebase/firestore';
import useAuth from "../hooks/useAuth";
import AlertModal from "./modals/AlertModal";

const FormularioClubLectura = ({ _id }) => {
  const [nombre, setNombre] = useState('');
  const [linkDiscord, setLinkDiscord] = useState('');
  const [fechaReunion, setFechaReunion] = useState('');
  const [horaReunion, setHoraReunion] = useState('');
  const [clubs, setClubs] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const { user } = useAuth(); // Asegúrate de tener acceso al contexto de autenticación

  useEffect(() => {
    const clubsCollection = collection(db, `clubs/${_id}/clubs`);
    const unsubscribe = onSnapshot(clubsCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setClubs(data);
    });
    return () => unsubscribe();
  }, [_id]);

  const handleMostrarFormulario = () => {
    if (user) {
      setMostrarFormulario(true);
    } else {
      setMostrarAlerta(true);
    }
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    setMostrarAlerta(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoClub = { nombre, linkDiscord, fechaReunion, horaReunion };

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
            <form className="label" onSubmit={handleSubmit}>
              {/* ... (resto del formulario) */}
              <button type="submit" className="modal-control">
                Crear Club
              </button>
              <button
                type="button"
                className="modal-control"
                onClick={handleOcultarFormulario}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
      {mostrarAlerta && <AlertModal />}
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