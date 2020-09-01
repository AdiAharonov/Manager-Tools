import React from 'react';
import Basic from './Forms/RectToolForm';


interface ModalProps  {
    showModal: boolean,
    modalName: string,
    handleCloseModal: Function,
    createRect: Function
}


export const Modal:React.FC<ModalProps> = ({showModal, modalName, handleCloseModal, createRect}) => {

    const display = !showModal ? {display: "none"} : {};


    return (
        
        <div className="global-modal" style={display} >
            <div className="modal-background" onClick={() => handleCloseModal()}></div>
        { showModal && <div className="modal-body">
        
            <h2>{modalName}</h2>
            <Basic handleCloseModal={handleCloseModal} createRect={createRect}/>
            
        </div>}
        </div>
    )
};