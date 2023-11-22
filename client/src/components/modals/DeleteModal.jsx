import React from "react";
import "../../styles/deleteModal.css";

const DeleteModal = ({isOpen, close, onDelete}) => {
  
  return (
    <div className={isOpen ? "delete-modal show-modal" : "delete-modal"}>
      <div className='modal-content'>
        <h3 className='modal-title'>Borrar comentario</h3>
        <p className='modal-message'>
        ¿Está seguro de que desea eliminar este comentario? 
        </p>
        <div className='modal-controls'>
          <button className='cancel-btn' onClick={close}>
            NO,CANCELAR
          </button>
          <button className='delete-btn' onClick={onDelete}>
            SI,ELIMINAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
