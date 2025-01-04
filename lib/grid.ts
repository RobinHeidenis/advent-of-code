export type Coordinate = { x: number; y: number };

export const makeCoordinateKey = (coordinate: Coordinate) => {
  return `${coordinate.x},${coordinate.y}`;
};
