import React, { useState} from 'react'
import {UploadImageTool} from './ToolBarTools/UploadImageTool';
import {PenTool} from './ToolBarTools/PenTool';
import {RectTool} from './ToolBarTools/RectTool';
import {UploadItemTool} from './ToolBarTools/UploadItemTool';
import {LayersTool} from './ToolBarTools/LayersTool';
import ReactTooltip from "react-tooltip";

interface ToolBarProps  {
    uploadImg: Function,
    setCurrTool: Function,
    handleOpenModal: Function
}


export const ToolBar:React.FC<ToolBarProps> = ({uploadImg, setCurrTool}) => {

    const [currTool, setNewCurrTool] = useState<string>('');

    const handleClick = (ev: Event, toolName: string) => {

        // Turn on/off the current tool
       
        // Case: No current tool or chosing a new tool
        if (currTool === '' || currTool !== toolName ) {
            setNewCurrTool(toolName);
            setCurrTool(toolName);
        }
        // Case: Clicking on the same tool to turn it off
        if (currTool === toolName) {
            setNewCurrTool('');
            setCurrTool('');
        }
        // Case: Creating new shape and immidietly resetting the tool
        if (currTool === 'rect' || currTool === 'upload item') {
            setCurrTool(toolName);
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