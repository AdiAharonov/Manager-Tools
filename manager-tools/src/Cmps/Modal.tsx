import React from 'react';



interface ModalProps  {
    showModal: boolean
}


export const Modal:React.FC<ModalProps> = ({showModal}) => {



    return (
        <div className="modal">
        { showModal && <div className="modal-body">
        
            <h2>modal</h2>
            <input type="text" />
            <div className="modal-background"></div>
        </div>}
        </div>
    )
};