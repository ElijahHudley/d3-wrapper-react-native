// @flow

export const coordinatesOnCircle = (angle: number, radius: number): Dimensions2D => ({
  y: -Math.sin((Math.PI / 2) - (angle * (Math.PI / 180))) * radius,
  x: Math.cos((Math.PI / 2) - (angle * (Math.PI / 180))) * radius,
});
