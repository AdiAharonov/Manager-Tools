import React, { useState} from 'react'
import {UploadImageTool} from './ToolBarTools/UploadImageTool';
import {PenTool} from './ToolBarTools/PenTool';
import {RectTool} from './ToolBarTools/RectTool';
import {UploadItemTool} from './ToolBarTools/UploadItemTool';
import {LayersTool} from './ToolBarTools/LayersTool';

interface ToolBarProps  {
    uploadImg: Function,
    setCurrTool: Function,
    handleOpenModal: Function
}


export const ToolBar:React.FC<ToolBarProps> = ({uploadImg, setCurrTool}) => {

    const [currTool, setNewCurrTool] = useState<string>('');

    const handleClick = (ev: Event, toolName: string) => {

        // Turn on/off the current tool
       
        if (currTool === '' || currTool !== toolName) {
            setNewCurrTool(toolName);
            setCurrTool(toolName);
        }
        if (currTool === toolName) {
            setNewCurrTool('');
            setCurrTool('');
        }
        
    
        
    }

    return (
        <>
            <div className="toolbar">
            <UploadImageTool uploadImg={uploadImg} />
            <PenTool handleClick={handleClick}/>
            <RectTool handleClick={handleClick}/>
            <UploadItemTool handleClick={handleClick}/>
            <LayersTool handleClick={handleClick}/>
            </div>
        </>
    )
}