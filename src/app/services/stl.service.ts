import { Injectable } from '@angular/core';
import { addQuietZone } from '../utils/stl.utils';

@Injectable({
  providedIn: 'root',
})
export class StlService {
  generateStlFile(matrix: boolean[][]): Blob {
    const quietZoneSize = 2;

    const paddedMatrix = addQuietZone(matrix, quietZoneSize);

    return new Blob([new ArrayBuffer(0)], { type: 'model/stl' });
  }
}
