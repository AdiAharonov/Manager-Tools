import React from 'react'
import { LayerInterface } from '../Services/interfaceService';

interface LayersBarProps  {
    layers: LayerInterface[];
    selectLayer: Function;
}


export const LayersBar:React.FC<LayersBarProps> = ({layers, selectLayer}) => {

    

    return (
        <div className="layers-bar">
            <h3>LAYERS</h3>
           {layers[0] &&
          layers.map((layer, idx) => (
            <button
              key={idx}
              id={idx.toString()}
              className={"layer " + layer.name}
              onClick={(e) => selectLayer(e)}
            >
              {layer.name}
            </button>
          ))}
        </div>
    )
}