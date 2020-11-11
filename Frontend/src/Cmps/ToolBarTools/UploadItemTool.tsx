import React from 'react';
import { ReactComponent as Icon } from '../../assets/icons/item.svg';
import ReactTooltip from 'react-tooltip';



interface UploadItemToolProps  {
    handleClick: Function
}


export const UploadItemTool:React.FC<UploadItemToolProps> = ({handleClick}) => {



    return (
        <div className="upload-item tool" onClick={(ev) => {handleClick(ev, "upload item")}}>
            <Icon className="icon" data-type="info" data-tip="Create Item"/>
            <ReactTooltip />
        </div>
    )
}