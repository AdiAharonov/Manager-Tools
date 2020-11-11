import React, {useState} from 'react'
import {LoginForm} from '../Cmps/Forms/LoginForm';

interface LoginProps {
    newUser: boolean;
    closeModal: Function;
}

export const Login:React.FC<LoginProps> = ({newUser, closeModal}) => {
    
    return (
        <div className="login-modal">
            {!newUser && <div className="login-modal-content">
                <button className="close-btn" onClick={() => closeModal({showModal: false, formType: ''})}>X</button>
    <h2>Login</h2>
             <LoginForm  handleCloseModal={closeModal}/>
            </div>}
            {newUser && <div className="register-modal-content">
                <button className="close-btn" onClick={() => closeModal({showModal: false, formType: ''})}>X</button>
    <h2>Register</h2>
            </div>}
        </div>
    )
}
