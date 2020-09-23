import {
  ItemInterface,
  RectInterface,
  LayerInterface,
} from './interfaceService';

// Home page categories

const gCategories: { name: string; link: string }[] = [
  { name: 'New Project', link: '/newproject' },
  { name: 'My Projects', link: '/' },
];

const getCategories = () => {
  return gCategories;
};

// Layers on the canvas

let gLayerIdx = 1;

const gLayers: LayerInterface[] = [
  { id: gLayerIdx, name: 'Default Layer', formation: [], show: true },
];

const getGLayers = () => {
  return gLayers;
};

const createNewLayer = () => {
  const newLayer = {
    id: ++gLayerIdx,
    name: `New Layer ${gLayerIdx}`,
    formation: [],
    show: true,
  };
  gLayers.push(newLayer);
  return gLayers;
};

const updateLayer = (id: number, formation: number[]) => {
  const layerIdx = gLayers.findIndex((layer) => layer.id === id);
  gLayers[layerIdx].formation = formation;
};

const handleShowLayer = (id: number, show: boolean) => {
  const layerIdx = gLayers.findIndex((layer) => layer.id === id);
  gLayers[layerIdx].show = show;
};

// Create & Handle Shapes

//Rectangels

const gRectangles: RectInterface[] = [];

const getRectangels = () => {
  return gRectangles;
};

const createRect = (name: string, width: number, height: number) => {
  const newRect = {
    id: gCanvasObjectId++,
    name,
    width,
    height,
    x: 50,
    y: 50,
    type: 'rect',
  };
  gRectangles.push(newRect);
};

const updateRectangels = (
  rectangel: RectInterface,
  currCoords: { x: number; y: number }
) => {
  const currRectIdx = gRectangles.findIndex((rect) => rect === rectangel);
  const updatedRect: RectInterface = {
    id: rectangel.id,
    name: rectangel.name,
    width: rectangel.width,
    height: rectangel.height,
    x: currCoords.x,
    y: currCoords.y,
    type: rectangel.type,
  };
  gRectangles.splice(currRectIdx, 1);
  gRectangles.push(updatedRect);
  return gRectangles;
};

// Items

const gItems: ItemInterface[] = [];

const getItems = () => {
  return gItems;
};

const getItemById = (id: number) => {
  const itemIdx = gItems.findIndex((item) => item.id === id);
  return gItems[itemIdx];
};

const updateItems = (
  currItem: ItemInterface,
  currCoords: { x: number; y: number },
  rotationAngle: number
) => {
  const currItemIdx = gItems.findIndex((item) => item.id === currItem.id);
  const updatedItem: ItemInterface = {
    id: currItem.id,
    name: currItem.name,
    title: currItem.title,
    radiusInMeters: currItem.radiusInMeters,
    angle: currItem.angle,
    x: currCoords.x,
    y: currCoords.y,
    rotationAngle,
    type: currItem.type,
  };
  gItems.splice(currItemIdx, 1);
  gItems.push(updatedItem);
  return gItems;
};

const createItem = (
  name: String,
  title: string,
  radiusInMeters: number,
  angle: number
) => {
  const newItem = {
    id: gCanvasObjectId++,
    name,
    title,
    radiusInMeters,
    angle,
    x: 100,
    y: 100,
    rotationAngle: 0,
    type: 'item',
  };
  gItems.push(newItem);
};

// find the canvas element clicked on the canvas

let gCanvasObjectId: number = 101;

const findCanvasObj = (xPosition: number, yPosition: number) => {
  let currCanvasObj: {
    id: number;
    name: String;
    width?: number;
    height?: number;
    radiusInMeters?: number;
    angle?: number;
    rotationAngle?: number;
    x: number;
    y: number;
    type?: string;
  } = { id: 0, name: '', x: 0, y: 0 };

  gRectangles.forEach((rect) => {
    for (let _i = rect.x; _i < rect.width + rect.x; _i++) {
      if (xPosition === _i) {
        for (let _j = rect.y; _j < rect.height + rect.y; _j++) {
          if (yPosition === _j) {
            currCanvasObj = rect;
          }
        }
      }
    }
  });

  if (currCanvasObj.id !== 0) return currCanvasObj;

  gItems.forEach((item) => {
    const d = Math.hypot(item.x - xPosition, item.y - yPosition);
    if (d <= item.radiusInMeters) currCanvasObj = item;
  });
  console.log(currCanvasObj);
  return currCanvasObj;
};

const validateCanvasObjectName = (name: String) => {
  if (gRectangles.find((rect) => rect.name === name)) return true;
  if (gItems.find((item) => item.name === name)) return true;
};

// Handle colors

// const updateBgc = (canvasObj) => {

// }

export const globalService = {
  getCategories,
  createNewLayer,
  getGLayers,
  updateLayer,
  createRect,
  getItems,
  getRectangels,
  updateRectangels,
  createItem,
  findCanvasObj,
  updateItems,
  validateCanvasObjectName,
  handleShowLayer,
  getItemById,
};
