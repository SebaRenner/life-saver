import { Injectable } from '@angular/core';
import {
  addQuietZone,
  construct3DMatrix,
  createBaseLayer,
  trianglesToStl,
} from '../utils/stl.utils';
import { matrixToTriangles } from '../utils/geometry.utils';

@Injectable({
  providedIn: 'root',
})
export class StlService {
  generateStlFile(matrix: boolean[][]): Blob {
    const quietZoneSize = 2;

    const paddedMatrix = addQuietZone(matrix, quietZoneSize);

    const baseLayer = createBaseLayer(paddedMatrix);

    const matrix3D = construct3DMatrix(paddedMatrix, baseLayer);

    const triangles = matrixToTriangles(matrix3D);

    const stl = trianglesToStl(triangles);

    return new Blob([stl], { type: 'model/stl' });
  }
}
