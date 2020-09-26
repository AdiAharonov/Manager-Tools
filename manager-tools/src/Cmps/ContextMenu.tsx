import React, { useState, useEffect } from 'react';
import InputColor from 'react-input-color';

interface ContextMenuProps {
  showContextMenu: boolean;
  x: number;
  y: number;
  selectedShape: { id: number; name: string; type: string };
  handleColorChange: Function;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  showContextMenu,
  x,
  y,
  selectedShape,
  handleColorChange,
}) => {
  const display = !showContextMenu ? { display: 'none' } : { top: y, left: x };

  // Change shape color

  const [gColor, setGColor] = useState<any>({});
  useEffect(() => {
    handleColorChange(selectedShape, gColor);
  }, [gColor]);

  // Change shape size

  return (
    <div className="global-ContextMenu" style={display}>
      <h3>{selectedShape.name}</h3>

      <div className="color-picker">
        <InputColor onChange={setGColor} initialValue="#fdffa6" />
      </div>
    </div>
  );
};
