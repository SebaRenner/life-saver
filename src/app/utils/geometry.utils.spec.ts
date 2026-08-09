import { isFilled, isInsideMatrix } from './geometry.utils';

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
});
