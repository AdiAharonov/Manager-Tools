import React from 'react';
import { ReactComponent as Icon } from '../../assets/icons/layers.svg';
import ReactTooltip from 'react-tooltip';



interface LayersToolProps  {
    handleClick: Function
}


export const LayersTool:React.FC<LayersToolProps> = ({handleClick}) => {



    return (
        <div className="layers tool" onClick={(ev) => {handleClick(ev, "layers")}}>
            <Icon className="icon" data-type="info" data-tip="Layers"/>
            <ReactTooltip />
        </div>
    )
}