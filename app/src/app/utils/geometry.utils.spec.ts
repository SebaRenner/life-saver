import { Face } from '../models/geometry.model';
import { createFace, isFilled, isInsideMatrix } from './geometry.utils';

// 2x2x2 matrix
const matrix: boolean[][][] = [
  [
    [true, true],
    [true, true],
  ],
  [
    [true, false],
    [false, true],
  ],
];

describe('GeometryUtils', () => {
  describe('isInsideMatrix', () => {
    it('should return true if the coordinates are inside the matrix', () => {
      // Act
      const result = isInsideMatrix(matrix, 0, 1, 1);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false if the coordinates are outside the matrix', () => {
      // Act
      const result = isInsideMatrix(matrix, 0, 1, 2);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('isFilled', () => {
    it('should return true if the coordinates are inside the matrix and the cube is true', () => {
      // Act
      // matrix[z=1][y=1][x=1] -> top layer, bottom-right -> true
      const result = isFilled(matrix, 1, 1, 1);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false if the coordinates are inside the matrix and the cube is false', () => {
      // Act
      // matrix[z=1][y=0][x=1] -> top layer, top-right -> false
      const result = isFilled(matrix, 1, 0, 1);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('createFace', () => {
    it('should build 2 triangles for the +Z (top) face of the cube at the origin', () => {
      // Arrange
      const topFace: Face = {
        normal: { x: 0, y: 0, z: 1 },
        corners: [
          { x: 0, y: 0, z: 1 },
          { x: 1, y: 0, z: 1 },
          { x: 1, y: 1, z: 1 },
          { x: 0, y: 1, z: 1 },
        ],
      };

      // Act
      const result = createFace(0, 0, 0, topFace);

      // Assert
      expect(result).toEqual([
        {
          normal: { x: 0, y: 0, z: 1 },
          vertices: [
            { x: 0, y: 0, z: 1 },
            { x: 1, y: 0, z: 1 },
            { x: 1, y: 1, z: 1 },
          ],
        },
        {
          normal: { x: 0, y: 0, z: 1 },
          vertices: [
            { x: 0, y: 0, z: 1 },
            { x: 1, y: 1, z: 1 },
            { x: 0, y: 1, z: 1 },
          ],
        },
      ]);
    });
  });
});
