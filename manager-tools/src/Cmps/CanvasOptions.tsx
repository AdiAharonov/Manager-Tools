import React, { useState, useEffect} from 'react';
import { Color } from '../Services/interfaceService';

import { ReactComponent as UndoIcon } from '../assets/icons/undo.svg';
import { ReactComponent as RedoIcon } from '../assets/icons/redo.svg';
import { ReactComponent as AddLayerIcon } from '../assets/icons/add-layer.svg';
import { ReactComponent as RotateCounterIcon } from '../assets/icons/rotate-left.svg';
import { ReactComponent as RotateClockwiseIcon } from '../assets/icons/rotate-right.svg';
import { ReactComponent as ShowGridIcon } from '../assets/icons/grid.svg';
import { ReactComponent as HideGridIcon } from '../assets/icons/grid-hidden.svg';
// import { ReactComponent as BucketPaint } from '../assets/icons/bucket-paint.svg';

// import { ReactComponent as Icon } from '../../assets/icons/pen.svg';

interface CanvasOptionsProps {
  handleUndo: Function;
  handleRedo: Function;
  addLayer: Function;
  handleItemRotaionClockwise: Function;
  handleItemRotaionCounterClockwise: Function;
  handleGrid: Function;
  currTool: string;
  showGrid: boolean;
  selectedShape: {id: number, name: string, type: string};
}

export const CanvasOptions: React.FC<CanvasOptionsProps> = ({
  handleUndo,
  handleRedo,
  addLayer,
  handleItemRotaionClockwise,
  handleItemRotaionCounterClockwise,
  handleGrid,
  showGrid,
  currTool,
  selectedShape
}) => {


  return (
    <>

    {/* {console.log(gColor)} */}
      <div className="canvas-options">

        

        

      <button className="canvas-options-button" onClick={() => addLayer()}>
          <AddLayerIcon />
        </button>

        <button className="canvas-options-button" onClick={() => handleGrid()}>
          {showGrid ? <HideGridIcon /> : <ShowGridIcon />}
        </button>

        
        {currTool === 'pen' && (
          <>
            <button
              className="canvas-options-button"
              onClick={() => handleUndo()}
            >
              <UndoIcon />
            </button>
            <button
              className="canvas-options-button"
              onClick={() => handleRedo()}
            >
              <RedoIcon />
            </button>
          </>
        )}

        {currTool === 'rect' && <></>}

        {selectedShape.type === 'item' && (
          <>
            <button
              className="canvas-options-button"
              onMouseDown={(e) => handleItemRotaionClockwise(e)}
              onMouseUp={(e) => handleItemRotaionClockwise(e)}
            >
              <RotateClockwiseIcon />
            </button>
            <button
              className="canvas-options-button"
              onMouseDown={(e) => handleItemRotaionCounterClockwise(e)}
              onMouseUp={(e) => handleItemRotaionCounterClockwise(e)}
            >
              <RotateCounterIcon />
            </button>
          </>
        )}

       
      </div>
    </>
  );
};
