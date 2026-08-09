import { Triangle } from '../models/geometry.model';

export const matrixToTriangles = (matrix: boolean[][][]): Triangle[] => {
  return [];
};

export const isInsideMatrix = (matrix: boolean[][][], x: number, y: number, z: number): boolean => {
  return (
    z >= 0 &&
    z < matrix.length &&
    y >= 0 &&
    y < matrix[z].length &&
    x >= 0 &&
    x < matrix[z][y].length
  );
};
