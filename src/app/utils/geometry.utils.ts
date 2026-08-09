import { Triangle } from '../models/geometry.model';

const FACE_NEIGHBORS: ReadonlyArray<[number, number, number]> = [
  [-1, 0, 0], // -X left
  [1, 0, 0], // +X right
  [0, -1, 0], // -Y front
  [0, 1, 0], // +Y back
  [0, 0, -1], // -Z down
  [0, 0, 1], // +Z up
];

export const matrixToTriangles = (matrix: boolean[][][]): Triangle[] => {
  const triangles: Triangle[] = [];

  for (let z = 0; z < matrix.length; z++) {
    for (let y = 0; y < matrix[z].length; y++) {
      for (let x = 0; x < matrix[z][y].length; x++) {
        if (!isFilled(matrix, x, y, z)) {
          continue;
        }

        // Draw a face only where the neighbor across it is empty (surface).
        for (const [dx, dy, dz] of FACE_NEIGHBORS) {
          if (!isFilled(matrix, x + dx, y + dy, z + dz)) {
            triangles.push(...createFace(x, y, z, [dx, dy, dz]));
          }
        }
      }
    }
  }

  return triangles;
};

const createFace = (
  x: number,
  y: number,
  z: number,
  normal: [number, number, number],
): Triangle[] => {
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

export const isFilled = (matrix: boolean[][][], x: number, y: number, z: number): boolean =>
  isInsideMatrix(matrix, x, y, z) && matrix[z][y][x];
