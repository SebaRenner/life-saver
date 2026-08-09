import { Triangle } from '../models/geometry.model';

export const addQuietZone = (matrix: boolean[][], quietZoneSize: number = 4): boolean[][] => {
  const paddedSize = matrix.length + quietZoneSize * 2;

  const emptyRow = (): boolean[] => Array.from({ length: paddedSize }, () => false);
  const margin = (): boolean[] => Array.from({ length: quietZoneSize }, () => false);

  const padded: boolean[][] = [];

  // Top paddings
  for (let i = 0; i < quietZoneSize; i++) {
    padded.push(emptyRow());
  }

  // Each row of the original matrix with left and right paddings
  for (const row of matrix) {
    padded.push([...margin(), ...row, ...margin()]);
  }

  // Bottom paddings
  for (let i = 0; i < quietZoneSize; i++) {
    padded.push(emptyRow());
  }

  return padded;
};

export const createBaseLayer = (matrix: boolean[][]): boolean[][] =>
  matrix.map((row) => row.map(() => false));

export const construct3DMatrix = (matrix: boolean[][], baseLayer: boolean[][]): boolean[][][] => [
  baseLayer,
  matrix,
];

/**
 * Serializes an array of triangles into an ASCII STL string:
 *
 *   solid name
 *     facet normal n1 n2 n3
 *       outer loop
 *         vertex p1x p1y p1z
 *         vertex p2x p2y p2z
 *         vertex p3x p3y p3z
 *       endloop
 *     endfacet
 *   endsolid name
 *
 * @param triangles the surface triangles to serialize
 * @param name the solid's name, written in the opening/closing tags
 * @returns the STL file contents as an ASCII string
 */
export const trianglesToStl = (triangles: Triangle[], name: string = 'model'): string => {
  const lines: string[] = [`solid ${name}`];

  for (const { normal, vertices } of triangles) {
    lines.push(`  facet normal ${normal.x} ${normal.y} ${normal.z}`);
    lines.push('    outer loop');
    for (const v of vertices) {
      lines.push(`      vertex ${v.x} ${v.y} ${v.z}`);
    }
    lines.push('    endloop');
    lines.push('  endfacet');
  }

  lines.push(`endsolid ${name}`);
  return lines.join('\n');
};
