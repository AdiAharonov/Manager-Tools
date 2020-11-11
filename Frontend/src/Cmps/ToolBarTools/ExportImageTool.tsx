import React from 'react';
import { ReactComponent as Icon } from '../../assets/icons/export-image.svg';
import ReactTooltip from 'react-tooltip';



interface ExportImageToolProps  {
    handleClick: Function
}


export const ExportImageTool:React.FC<ExportImageToolProps> = ({handleClick}) => {



    return (
        <div className="ExportImage tool" onClick={(ev) => {handleClick(ev, "ExportImage")}}>
            <Icon className="icon" data-type="info" data-tip="Export Image"/>
            
            <ReactTooltip />
        </div>
    )
}