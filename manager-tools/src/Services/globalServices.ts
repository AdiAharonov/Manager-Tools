const gCategories: { name: string; link: string }[] = [
  { name: 'New Project', link: '/newproject' },
  { name: 'My Project', link: '/' },
  { name: 'Blank1', link: '/' },
  { name: 'Blank2', link: '/' },
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
const gItems: { id: number, name: String, title: String, radiusInMeters: number, angle: number}[] = [];
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

const createItem = ( name: String, title: String, radiusInMeters: number, angle: number) => {
  const newItem = { id: gCanvasObjectId++, name, title, radiusInMeters, angle };
  gItems.push(newItem);
}

const findCanvasObj = (xPosition: number, yPosition: number) => {

 let currCanvasObj: {id: number, name: String, width: number, height: number, x: number, y: number} = { id: 0, name: '', width: 0, height: 0, x: 0, y: 0};
 
 gRectangles.forEach( rect => {
  for ( let _i = rect.x; _i < (rect.width + rect.x); _i++) {
    if (xPosition === _i) {
       for( let _j = rect.y; _j < (rect.height + rect.y); _j++) {
         if (yPosition === _j) {
           currCanvasObj = rect
         }
       }
    }

  }
  })

  return currCanvasObj;
  
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
  findCanvasObj
};
