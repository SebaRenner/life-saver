import { Injectable } from '@angular/core';
import { addQuietZone, construct3DMatrix, createBaseLayer } from '../utils/stl.utils';

@Injectable({
  providedIn: 'root',
})
export class StlService {
  generateStlFile(matrix: boolean[][]): Blob {
    const quietZoneSize = 2;

    const paddedMatrix = addQuietZone(matrix, quietZoneSize);

    const baseLayer = createBaseLayer(paddedMatrix);

    const matrix3D = construct3DMatrix(paddedMatrix, baseLayer);

    // Transfrom 3D matrix to STL format? ArrayBuffer?

    return new Blob([new ArrayBuffer(0)], { type: 'model/stl' });
  }
}
