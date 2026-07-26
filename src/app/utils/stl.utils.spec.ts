import { addQuietZone } from './stl.utils';

describe('StlUtils', () => {
  describe('addQuietZone', () => {
    it('should have a quiet zone of 4 pixels around the original matrix', () => {
      // Arrange
      const originalMatrix = [
        [true, true, true],
        [true, true, true],
        [true, true, true],
      ];

      const expectedMatrix = [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, true, true, true, false, false],
        [false, false, true, true, true, false, false],
        [false, false, true, true, true, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
      ];

      // Act
      const result = addQuietZone(originalMatrix, 2);

      // Assert
      expect(result).toEqual(expectedMatrix);
    });
  });
});
