const gCategories: { name: string; link: string }[] = [
  { name: 'New Project', link: '/newproject' },
  { name: 'My Projects', link: '/' },
];

const getCategories = () => {
  return gCategories;
};

const getGLayers = () => {
  return gLayers;
};

let gLayerIdx = 1;

// Layers on the canvas
const gLayers: { id: number, name: string; formation: number[] }[] = [
  {id: gLayerIdx, name: 'Default Layer', formation: [] },
];


const createNewLayer = () => {
  const newLayer = { id: ++gLayerIdx, name: `New Layer ${gLayerIdx}`, formation: [] };
  gLayers.push(newLayer);
  return gLayers;
};

const updateLayer = (id: number, formation: number[]) => {
  const layerIdx = gLayers.findIndex((layer) => layer.id === id);
  gLayers[layerIdx].formation = formation;
};

// Create & Handle Shapes

const gRectangles: { id: number, name: String, width: number, height: number, x: number, y: number}[] = [];
const gItems: { id: number, name: String, title: string, radiusInMeters: number, angle: number, x: number, y: number, endPoints?: { x1: number, y1: number, x2: number, y2: number}}[] = [];
let gCanvasObjectId: number = 101

const getRectangels = () => {
  return gRectangles;
}

const createRect = ( name: string, width: number, height: number) => {
    const newRect = {id: gCanvasObjectId++, name, width, height, x: 50, y: 50};
    gRectangles.push(newRect);
}

const updateRectangels = (rectangel: { id: number; name: String; width: number; height: number; x: number; y: number; }, currCoords: { x: number, y: number}) => {
  const currRectIdx = gRectangles.findIndex(rect => rect === rectangel);
  const updatedRect: { id: number; name: String; width: number; height: number; x: number; y: number; } = { id: rectangel.id, name: rectangel.name, width: rectangel.width, height: rectangel.height, x: currCoords.x, y: currCoords.y}
  gRectangles.splice(currRectIdx, 1);
  gRectangles.push(updatedRect);
  return gRectangles;
}



const getItems = () => {
  return gItems;
}

const updateItems = (currItem: { id: number;name: String, title: string, radiusInMeters: number, angle: number, x: number, y: number }, currCoords: { x: number, y: number}) => {
  const currItemIdx = gItems.findIndex(item => item.id === currItem.id);
  const updatedItem: { id: number;name: String, title: string, radiusInMeters: number, angle: number, x: number, y: number } = { id: currItem.id, name: currItem.name, title: currItem.title, radiusInMeters: currItem.radiusInMeters, angle: currItem.angle, x: currCoords.x, y: currCoords.y};
  console.log(updatedItem.x, updatedItem.y)
  gItems.splice(currItemIdx, 1);
  gItems.push(updatedItem);
  return gItems;
}

const createItem = ( name: String, title: string, radiusInMeters: number, angle: number) => {
  const newItem = { id: gCanvasObjectId++, name, title, radiusInMeters, angle, x: 40, y: 40 };
  gItems.push(newItem);
}

const findCanvasObj = (xPosition: number, yPosition: number) => {

 let currCanvasObj: {id: number, name: String, width?: number, height?: number, radiusInMeters?: number, angle?: number, x: number, y: number} = { id: 0, name: '', x: 0, y: 0};
 
 gRectangles.forEach( rect => {
  for ( let _i = rect.x; _i < (rect.width + rect.x); _i++) {
    if (xPosition === _i) {
       for( let _j = rect.y; _j < (rect.height + rect.y); _j++) {
         if (yPosition === _j) {
           currCanvasObj = rect;
         }
       }
    }

  }
  })

  if (currCanvasObj.id !== 0) return currCanvasObj;

  gItems.forEach( item => {

    const d = Math.hypot(item.x - xPosition, item.y - yPosition);
    if (d <= item.radiusInMeters) currCanvasObj = item;
  
    })

  return currCanvasObj;
  
}

const validateCanvasObjectName = (name: String) => {
 if (gRectangles.find((rect) => rect.name === name)) return true
 if (gItems.find((item) => item.name === name)) return true;
 
}

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
  validateCanvasObjectName
};
