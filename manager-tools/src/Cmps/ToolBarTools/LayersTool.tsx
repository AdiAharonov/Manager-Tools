import React from 'react';
import { ReactComponent as Icon } from '../../assets/icons/layers.svg';



interface LayersToolProps  {
    handleClick: Function
}


export const LayersTool:React.FC<LayersToolProps> = ({handleClick}) => {



    return (
        <div className="layers tool" onClick={(ev) => {handleClick(ev, "layers")}}>
            <Icon className="icon" />
        </div>
    )
}