import React from "react";
import "../../styles/alertModal.css";
import {useNavigate} from "react-router-dom";
const AlertModal = ({isOpen}) => {
    const navigate = useNavigate();
    return (
        <div className={isOpen ? "alert-modal show-modal" : "alert-modal"}>
            <div className='modal-content'>
                <h3 className='modal-title'>Se requiere autenticación</h3>
                <p className='modal-message'>Debes iniciar sesión para poder comentar</p>
                <div className='modal-controls'>
                    <button className='signup-btn' onClick={() => navigate('/sign-up')}>Registrarse</button>
                    <button className='signin-btn' onClick={() => navigate('/sign-in')}>Iniciar Sesión</button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
