import { Triangle } from '../models/geometry.model';
import { addQuietZone, construct3DMatrix, createBaseLayer, trianglesToStl } from './stl.utils';

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

  describe('createBaseLayer', () => {
    it('should create a base layer with the same dimensions as the original matrix', () => {
      // Arrange
      const originalMatrix = [[true], [true, true], [true, false, true]];

      const expectedBaseLayer = [[false], [false, false], [false, false, false]];

      // Act
      const result = createBaseLayer(originalMatrix);

      // Assert
      expect(result).toEqual(expectedBaseLayer);
    });
  });

  describe('construct3DMatrix', () => {
    it('should construct a 3D matrix with the base layer and the original matrix', () => {
      // Arrange
      const originalMatrix = [
        [true, true],
        [true, false],
      ];
      const baseLayer = [
        [true, true],
        [true, true],
      ];

      // Act
      const result = construct3DMatrix(originalMatrix, baseLayer);

      // Assert
      expect(result[0]).toEqual(baseLayer);
      expect(result[1]).toEqual(originalMatrix);
    });
  });

  describe('trianglesToStl', () => {
    it('should serialize triangles into an ASCII STL string', () => {
      // Arrange
      const triangle: Triangle = {
        normal: { x: 0, y: 0, z: 1 },
        vertices: [
          { x: 1, y: 0, z: 0 },
          { x: 1, y: 1, z: 0 },
          { x: 0, y: 0, z: 1 },
        ],
      };

      const expectedStlString = [
        'solid test',
        '  facet normal 0 0 1',
        '    outer loop',
        '      vertex 1 0 0',
        '      vertex 1 1 0',
        '      vertex 0 0 1',
        '    endloop',
        '  endfacet',
        'endsolid test',
      ].join('\n');

      // Act
      const result = trianglesToStl([triangle], 'test');

      // Assert
      expect(result).toBe(expectedStlString);
    });
  });
});
