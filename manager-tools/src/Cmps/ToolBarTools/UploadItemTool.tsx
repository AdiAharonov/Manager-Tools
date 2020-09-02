import React from 'react';



interface UploadItemToolProps  {
    handleClick: Function
}


export const UploadItemTool:React.FC<UploadItemToolProps> = ({handleClick}) => {



    return (
        <div className="upload-item tool" onClick={(ev) => {handleClick(ev, "upload item")}}>
            
        </div>
    )
}