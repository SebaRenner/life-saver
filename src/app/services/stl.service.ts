import { Injectable } from '@angular/core';
import {
  addQuietZone,
  construct3DMatrix,
  createBaseLayer,
  stlToBlob,
  trianglesToStl,
} from '../utils/stl.utils';
import { invertMatrix, matrixToTriangles } from '../utils/geometry.utils';

@Injectable({
  providedIn: 'root',
})
export class StlService {
  generateStlFile(matrix: boolean[][]): { black: Blob; white: Blob } {
    const quietZoneSize = 2;

    const paddedMatrix = addQuietZone(matrix, quietZoneSize);

    const baseLayer = createBaseLayer(paddedMatrix);

    const matrix3D = construct3DMatrix(paddedMatrix, baseLayer);

    const blackTriangles = matrixToTriangles(matrix3D);
    const whiteTriangles = matrixToTriangles(invertMatrix(matrix3D));

    const blackStl = trianglesToStl(blackTriangles);
    const whiteStl = trianglesToStl(whiteTriangles);

    return {
      black: stlToBlob(blackStl),
      white: stlToBlob(whiteStl),
    };
  }
}
