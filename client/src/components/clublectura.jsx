import '../styles/formen.css';
import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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
  const [tiempoOcultarAlerta, setTiempoOcultarAlerta] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingClubId, setEditingClubId] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const clubsCollection = collection(db, `clubs/${_id}/clubs`);
    const unsubscribe = onSnapshot(clubsCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setClubs(data);
    });
    return () => unsubscribe();
  }, [_id]);

  const handleMostrarFormulario = () => {
    if (user) {
      setMostrarFormulario(true);
      setMostrarAlerta(false);
    } else {
      setMostrarAlerta(true);
      const timeoutId = setTimeout(() => {
        setMostrarAlerta(false);
      }, 3000);

      setTiempoOcultarAlerta(timeoutId);
    }
  };

  useEffect(() => {
    return () => {
      if (tiempoOcultarAlerta) {
        clearTimeout(tiempoOcultarAlerta);
      }
    };
  }, [mostrarAlerta, tiempoOcultarAlerta]);

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    setMostrarAlerta(false);
    setIsEditing(false);
    setEditingClubId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing && editingClubId) {
      // Lógica para editar el club
      await updateClub(editingClubId, { nombre, linkDiscord, fechaReunion, horaReunion });
    } else {
      // Lógica para agregar un nuevo club
      await addClub({ nombre, linkDiscord, fechaReunion, horaReunion });
    }

    setNombre('');
    setLinkDiscord('');
    setFechaReunion('');
    setHoraReunion('');
    handleOcultarFormulario();
  };

  const addClub = async (nuevoClub) => {
    await addDoc(collection(db, `clubs/${_id}/clubs`), nuevoClub);
  };

  const updateClub = async (clubId, updatedClub) => {
    const clubRef = doc(db, `clubs/${_id}/clubs`, clubId);
    await updateDoc(clubRef, updatedClub, { merge: true });
  };

  const handleEditarClub = (clubId) => {
    const clubToEdit = clubs.find((club) => club.id === clubId);
    if (clubToEdit && user && clubToEdit.creadorId === user.uid) {
      setNombre(clubToEdit.nombre || '');
      setLinkDiscord(clubToEdit.linkDiscord || '');
      setFechaReunion(clubToEdit.fechaReunion || '');
      setHoraReunion(clubToEdit.horaReunion || '');

      setIsEditing(true);
      setEditingClubId(clubId);
      setMostrarFormulario(true);
    }
  };

  const handleEliminarClub = async (clubId) => {
    // Verificar si el usuario actual es el creador antes de permitir la eliminación
    const clubToDelete = clubs.find((club) => club.id === clubId);
    if (clubToDelete && user && clubToDelete.creadorId === user.uid) {
      await deleteDoc(doc(db, `clubs/${_id}/clubs`, clubId));
    } else {
      console.log('No tienes permisos para eliminar este formulario.');
    }
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
              <button type="submit" className="modal-control">
                {isEditing ? "Editar Club" : "Crear Club"}
              </button>
              <button type="button" className='modal-control' onClick={handleOcultarFormulario}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
      <AlertModal isOpen={mostrarAlerta} />
      {/* Mostrar la lista de clubs */}
      <ul className="club-list">
        {clubs.map((club) => (
          <li key={club.id} className="club-item">
            <strong>Nombre:</strong> {club.nombre},{' '}
            <br/><strong>Link:</strong>{' '}
            {club.linkDiscord && (
              <a href={club.linkDiscord} target="_blank" rel="noopener noreferrer">
                {club.linkDiscord}
              </a>
            )}, <br/><strong>Dia:</strong> {club.fechaReunion}
                <strong> Hora:</strong> {club.horaReunion}
            {user && club.creadorId === user.uid && (
              <>
                <button className='formbt' onClick={() => handleEditarClub(club.id)}>Editar</button>
                <button className='formbt' onClick={() => handleEliminarClub(club.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormularioClubLectura;
