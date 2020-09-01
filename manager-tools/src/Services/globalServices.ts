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

const gRectangles: { name: String, width: number, height: number, x: number, y: number}[] = []

const getRectangels = () => {
  return gRectangles;
}

const createRect = (name: string, width: number, height: number) => {
    const newRect = {name, width, height, x: 50, y: 50};
    gRectangles.push(newRect);
}

const updateRectangels = (rectangel: { name: String; width: number; height: number; x: number; y: number; }, currCoords: { x: number, y: number}) => {
  const currRectIdx = gRectangles.findIndex(rect => rect === rectangel);
  const updatedRect: { name: String; width: number; height: number; x: number; y: number; } = { name: rectangel.name, width: rectangel.width, height: rectangel.height, x: currCoords.x, y: currCoords.y}
  gRectangles.splice(currRectIdx, 1);
  gRectangles.push(updatedRect);
  return gRectangles;
}

export const globalService = {
  getCategories,
  createNewLayer,
  getGLayers,
  updateLayer,
  createRect,
  getRectangels,
  updateRectangels
};
