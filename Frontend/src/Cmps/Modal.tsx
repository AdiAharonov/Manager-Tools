import React, {useEffect} from 'react';
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

    // In these case there is no need for modal only activate the tool 
    useEffect(() => {
      if (modalName === 'pen' || modalName === 'layers') {
        handleCloseModal()
      }
    }, [modalName])


    return (
        
        <div className="global-modal" style={display} >
            
            {/*Create invisible background behined the modal, when clicked it closes the modal  */}
          {modalName !== 'pen' && modalName !== 'layers' && <div className="modal-background" onClick={() => handleCloseModal()}></div>} 
        
           {/*The case that you need modal  */}
        { showModal && modalName !== 'pen' && modalName !== 'layers' && <div className="modal-body">
        
            <h2>{modalName}</h2>
            {/* Each tool has a uniqe form */}
            { modalName === 'rect' && <RectToolForm handleCloseModal={handleCloseModal} createRect={createRect}/>}
            { modalName === 'upload item' && <UploadItemToolForm handleCloseModal={handleCloseModal} createItem={createItem} />}
            
        </div>}
        </div>
    )
};