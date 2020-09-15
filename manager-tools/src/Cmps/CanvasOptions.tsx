import React from 'react';

import { ReactComponent as UndoIcon } from '../assets/icons/undo.svg';
import { ReactComponent as RedoIcon } from '../assets/icons/redo.svg';
import { ReactComponent as AddLayerIcon } from '../assets/icons/add-layer.svg';
import { ReactComponent as RotateCounterIcon } from '../assets/icons/rotate-left.svg';
import { ReactComponent as RotateClockwiseIcon } from '../assets/icons/rotate-right.svg';
import { ReactComponent as ShowGridIcon } from '../assets/icons/show-grid.svg';
// import { ReactComponent as Icon } from '../../assets/icons/pen.svg';

interface CanvasOptionsProps {
  handleUndo: Function;
  handleRedo: Function;
  addLayer: Function;
  handleItemRotaionClockwise: Function;
  handleItemRotaionCounterClockwise: Function;
  handleGrid: Function;

  showGrid: boolean;
}

export const CanvasOptions: React.FC<CanvasOptionsProps> = ({
  handleUndo,
  handleRedo,
  addLayer,
  handleItemRotaionClockwise,
  handleItemRotaionCounterClockwise,
  handleGrid,
  showGrid,
}) => {
  return (
    <>
      <div className="canvas-options">
        <button className="canvas-options-button" onClick={() => handleUndo()}>
          <UndoIcon />
        </button>
        <button className="canvas-options-button" onClick={() => handleRedo()}>
          <RedoIcon />
        </button>
        <button className="canvas-options-button" onClick={() => addLayer()}>
          <AddLayerIcon />
        </button>
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

        <button className="canvas-options-button" onClick={() => handleGrid()}>
          {showGrid ? <ShowGridIcon /> : <ShowGridIcon />}
        </button>
      </div>
    </>
  );
};
