import React from 'react';
import RectToolForm from './Forms/RectToolForm';
import UploadItemToolForm from './Forms/UploadItemToolForm';


interface ModalProps  {
    showModal: boolean,
    modalName: string,
    handleCloseModal: Function,
    createRect: Function,
    createItem: Function
}


export const Modal:React.FC<ModalProps> = ({showModal, modalName, handleCloseModal, createRect, createItem}) => {

    const display = !showModal ? {display: "none"} : {};


    return (
        
        <div className="global-modal" style={display} >
            <div className="modal-background" onClick={() => handleCloseModal()}></div>
        { showModal && <div className="modal-body">
        
            <h2>{modalName}</h2>
            { modalName === 'rect' && <RectToolForm handleCloseModal={handleCloseModal} createRect={createRect}/>}
            { modalName === 'upload item' && <UploadItemToolForm handleCloseModal={handleCloseModal} createItem={createItem} />}
            
        </div>}
        </div>
    )
};