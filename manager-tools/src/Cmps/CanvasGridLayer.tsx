import React, { useEffect, useState } from 'react';
import { Layer,  Line } from 'react-konva';
import Konva from 'konva';

interface CanvasGridLayerProps {
    width: number;
    hieght: number;
    showGrid: boolean;
}

export const CanvasGridLayer: React.FC<CanvasGridLayerProps> = ({ width, hieght, showGrid }) => {

   const [grid, setGrid ] = useState<{w: number[][], h: number[][]}>({ w: [], h: []})

   useEffect(() => {
    createGrid(width, hieght); 
  }, []);


   const createGrid = (w: number, h: number) => {

    // width lines
        for (var _i = 0; _i < w; _i) {
            grid.w.push([_i , 0, _i, h])
            _i += 20;
        }
    // height lines
        for (let _i = 0; _i < h; _i) {
            grid.h.push([ 0, _i, w, _i])
            _i += 20;
        }
        
       
    }

    
  return (
  <Layer>
      { showGrid && grid.w[0] && grid.w.map((line, idx) =>  <Line key={idx}  x={0} y={0} points={line} stroke="#0010697d" strokeWidth={0.5} />)}
      { showGrid && grid.h[0] && grid.h.map((line, idx) =>  <Line key={idx}  x={0} y={0} points={line} stroke="#0010697d" strokeWidth={0.5} />)}
  </Layer>
  )};
