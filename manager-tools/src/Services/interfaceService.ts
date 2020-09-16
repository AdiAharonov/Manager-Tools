export interface RectInterface {
  id: number;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface LayerInterface {
  id: number;
  name: string;
  formation: number[];
  show: boolean;
}

export interface ItemInterface {
  id: number;
  name: String;
  title: string;
  radiusInMeters: number;
  angle: number;
  x: number;
  y: number;
}
