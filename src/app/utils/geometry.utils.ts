import { Triangle, Vec3 } from '../models/geometry.model';

interface Face {
  normal: Vec3;
  corners: [Vec3, Vec3, Vec3, Vec3];
}

const FACES: ReadonlyArray<Face> = [
  {
    normal: { x: -1, y: 0, z: 0 }, // -X
    corners: [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 1, z: 1 },
      { x: 0, y: 1, z: 0 },
    ],
  },
  {
    normal: { x: 1, y: 0, z: 0 }, // +X
    corners: [
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 1, y: 1, z: 1 },
      { x: 1, y: 0, z: 1 },
    ],
  },
  {
    normal: { x: 0, y: -1, z: 0 }, // -Y
    corners: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 0, z: 1 },
      { x: 0, y: 0, z: 1 },
    ],
  },
  {
    normal: { x: 0, y: 1, z: 0 }, // +Y
    corners: [
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: 1, y: 1, z: 0 },
    ],
  },
  {
    normal: { x: 0, y: 0, z: -1 }, // -Z
    corners: [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 1, y: 0, z: 0 },
    ],
  },
  {
    normal: { x: 0, y: 0, z: 1 }, // +Z
    corners: [
      { x: 0, y: 0, z: 1 },
      { x: 1, y: 0, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: 0, y: 1, z: 1 },
    ],
  },
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
        for (const face of FACES) {
          const { x: dx, y: dy, z: dz } = face.normal;
          if (!isFilled(matrix, x + dx, y + dy, z + dz)) {
            triangles.push(...createFace(x, y, z, face));
          }
        }
      }
    }
  }

  return triangles;
};

// Builds the 2 triangles that make up one exposed cube face.
const createFace = (x: number, y: number, z: number, face: Face): Triangle[] => {
  // Turn the 4 corner offsets into absolute points around this cube.
  const [a, b, c, d] = face.corners.map(
    (corner): Vec3 => ({ x: x + corner.x, y: y + corner.y, z: z + corner.z }),
  );

  // Split the quad (a, b, c, d) into 2 triangles sharing the a-c diagonal.
  return [
    { normal: face.normal, vertices: [a, b, c] },
    { normal: face.normal, vertices: [a, c, d] },
  ];
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
