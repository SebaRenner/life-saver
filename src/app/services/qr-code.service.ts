import { Injectable } from '@angular/core';
import QRCode, { BitMatrix } from 'qrcode';

@Injectable({
  providedIn: 'root',
})
export class QrCodeService {
  generateQrCode(data: string): boolean[][] {
    const qr = QRCode.create(data, { errorCorrectionLevel: 'H' });
    const bitMatrix: BitMatrix = qr.modules;

    const size = bitMatrix.size;
    const grid: boolean[][] = [];

    for (let row = 0; row < size; row++) {
      grid[row] = [];
      for (let col = 0; col < size; col++) {
        grid[row][col] = !!bitMatrix.get(row, col);
      }
    }

    return grid;
  }
}
