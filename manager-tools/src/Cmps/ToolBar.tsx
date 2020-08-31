import React, { useState} from 'react'
import {UploadImageTool} from './UploadImageTool';
import {PenTool} from './PenTool';
import {RectTool} from './RectTool';

interface ToolBarProps  {
    uploadImg: Function,
    setCurrTool: Function,
    handleOpenModal: Function
}


export const ToolBar:React.FC<ToolBarProps> = ({uploadImg, setCurrTool}) => {

    const [currTool, setNewCurrTool] = useState<string>('');

    const handleClick = (ev: Event, toolName: string) => {

        // Turn on/off the current tool
        console.log(toolName)
        if (currTool === '') {
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
            </div>
        </>
    )
}