import React from 'react'
import axios from 'axios';
import {UploadImageTool} from './UploadImageTool';

interface ToolBarProps  {
    uploadImg: Function
}


export const ToolBar:React.FC<ToolBarProps> = ({uploadImg}) => {

    

    return (
        <>
            <div className="upload-image-tool">
            <UploadImageTool uploadImg={uploadImg} />
            </div>
        </>
    )
}