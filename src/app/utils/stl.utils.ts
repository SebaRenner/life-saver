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
