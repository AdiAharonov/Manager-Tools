import React from 'react';
import { ReactComponent as Icon } from '../../assets/icons/pen.svg';
import ReactTooltip from 'react-tooltip';



interface PenToolProps  {
    handleClick: Function
}


export const PenTool:React.FC<PenToolProps> = ({handleClick}) => {



    return (
        <div className="pen tool" onClick={(ev) => {handleClick(ev, "pen")}}>
            <Icon className="icon" data-type="info" data-tip="Pen Tool" />
            <ReactTooltip />
        </div>
    )
}