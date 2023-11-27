import React, {memo, useState} from "react";
import "../../styles/commentForm.css";
import {FcLock} from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import AlertModal from "../modals/AlertModal";

const CommentForm = ({onSubmit,isAlertOpen}) => {
    const {user} = useAuth();
    return (
        <form className='comment-form container ' onSubmit={onSubmit}>
    <div className='row align-items-center'>
        {user ? (
            <div className='col-md-2 col-2'>
                <div className='user'>
                    {user.photoURL ? (
                        <img
                            className='avatar img-fluid'
                            referrerPolicy='no-referrer'
                            title={user.email}
                            src={user.photoURL}
                            alt={user.displayName}
                        />
                    ) : (
                        user.email.charAt(0)
                    )}
                </div>
            </div>
        ) : (
            <div className='col-md-1 col-2'>
                <div className='no-user'>
                    <FcLock className='lock-icon' size='18px' />
                </div>
            </div>
        )}
        <div className='col-md-6 col-5'>
            <textarea
                className='form-control input-text'
                name='comment'
                id='comment'
                placeholder='Agrega tu comentario...'
                rows='3'
            />
        </div>
        <div className='col-md-1 col-3 mt-2 mt-md-0'>
            <button type='submit' className='nn btn btn-secondary send-btn' title='Enviar comentario'>
                Enviar
            </button>
        </div>
    </div>
    <AlertModal isOpen={isAlertOpen} />
</form>
    );
};

export default memo(CommentForm);
