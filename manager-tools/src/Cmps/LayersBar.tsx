import React, {useState} from 'react'
import { LayerInterface } from '../Services/interfaceService';
import { ReactComponent as EyeIcon } from '../assets/icons/eye.svg';
import { ReactComponent as EyeHiddenIcon } from '../assets/icons/eye-hidden.svg';

interface LayersBarProps  {
    layers: LayerInterface[];
    selectLayer: Function;
    handleShowLayer: Function
}


export const LayersBar:React.FC<LayersBarProps> = ({layers, selectLayer, handleShowLayer}) => {

    // Sets layers row with background and makes a "selected layer"
    const [selectedLayerId, setSelectedLayer] = useState<number>(101)

    return (
        <>
            <h3>LAYERS</h3>
           {layers[0] &&
          layers.map((layer, idx) => (
              <div className={selectedLayerId === layer.id ? 'layer-row selected' : 'layer-row'}>
            <button
              key={idx}
              id={idx.toString()}
              className="layer"
              onClick={(e) => {
                  selectLayer(e)
                  setSelectedLayer(layer.id)
              }}
            >
              {layer.name}
            </button>
            <button className="show-layer-button" onClick={() => handleShowLayer(layer)}>{layer.show ? <EyeIcon fill="#fff" className="icon" width="20px" stroke="#fff"/> : <EyeHiddenIcon stroke="#fff" width="20px" className="icon" />}   </button>
            </div>
          ))}
        </>
    )
}