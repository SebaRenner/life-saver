import { isInsideMatrix } from './geometry.utils';

describe('GeometryUtils', () => {
  describe('isInsideMatrix', () => {
    it('should return true if the coordinates are inside the matrix', () => {
      // Arrange
      // 2x2x2 matrix
      const matrix: boolean[][][] = [
        [
          [true, true],
          [true, true],
        ],
        [
          [true, true],
          [true, true],
        ],
      ];

      // Act
      const result = isInsideMatrix(matrix, 0, 1, 1);

      // Assert
      expect(result).toBe(true);
    });
  });

  it('should return false if the coordinates are outside the matrix', () => {
    // Arrange
    // 2x2x2 matrix
    const matrix: boolean[][][] = [
      [
        [true, true],
        [true, true],
      ],
      [
        [true, true],
        [true, true],
      ],
    ];

    // Act
    const result = isInsideMatrix(matrix, 0, 1, 2);

    // Assert
    expect(result).toBe(false);
  });
});
