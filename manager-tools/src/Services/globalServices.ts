const gCategories: { name: string; link: string }[] = [
  { name: 'New Project', link: '/newproject' },
  { name: 'My Project', link: '/' },
  { name: 'Blank1', link: '/' },
  { name: 'Blank2', link: '/' },
];


let gLayerIdx = 101;


const gLayers: { id: number, name: string; formation: number[] }[] = [
  {id: gLayerIdx, name: 'Default Layer', formation: [] },
];
const getCategories = () => {
  return gCategories;
};

const getGLayers = () => {
  return gLayers;
};

const createNewLayer = () => {
  const newLayer = { id: ++gLayerIdx, name: 'New Layer', formation: [] };
  gLayers.push(newLayer);
  return newLayer;
};

const updateLayer = (id: number, formation: number[]) => {
  const layerIdx = gLayers.findIndex((layer) => layer.id === id);
  gLayers[layerIdx].formation = formation;
};

export const globalService = {
  getCategories,
  createNewLayer,
  getGLayers,
  updateLayer,
};
