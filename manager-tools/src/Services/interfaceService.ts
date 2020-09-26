export interface RectInterface {
  id: number;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  type: string;
  color: string;
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
  rotationAngle: number;
  type: string;
  color: Color;
}

export interface Color {
  r: string;
  g: string;
  b: string;
  a: string;
}
