import React, { useState, useEffect } from 'react';
import InputColor from 'react-input-color';
import { globalService } from '../Services/globalServices';

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


  // Change shape name
  const [shapeName, setShapeName] = useState<string>('')

  useEffect(() => {
    setShapeName(selectedShape.name)
  }, [selectedShape.name])

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    const newName = ev.target.value;
    if (newName !== '') {
      setShapeName(newName)
      globalService.HandleShapeName(newName, selectedShape)
    } else if (newName === '') {
      setShapeName(newName)
      globalService.HandleShapeName('Default', selectedShape)
    }
    console.log(ev.target)
  }

  return (
    <div className="global-ContextMenu" style={display}>
      { selectedShape.name && <input type="text" value={shapeName} onChange={e => handleChange(e)}/>}

      <div className="shape-size">
        {/* { selectedShape.type === 'rect' && 
        
        } */}
      </div>

      <div className="color-picker">
        <InputColor onChange={setGColor} initialValue="#fdffa6" />
      </div>
    </div>
  );
};
