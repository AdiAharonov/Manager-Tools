import React from 'react';
import { ReactComponent as Icon } from '../../assets/icons/rect.svg';
import ReactTooltip from 'react-tooltip';



interface RectToolProps  {
    handleClick: Function
}


export const RectTool:React.FC<RectToolProps> = ({handleClick}) => {



    return (
        <div className="rect tool" onClick={(ev) => {handleClick(ev, "rect")}}>
            <Icon className="icon" data-type="info" data-tip="Create Room"/>
            <ReactTooltip />
        </div>
    )
}