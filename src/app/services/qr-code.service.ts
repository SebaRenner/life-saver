import { Injectable } from '@angular/core';
import QRCode, { BitMatrix } from 'qrcode';

@Injectable({
  providedIn: 'root',
})
export class QrCodeService {
  async generateQrCode(data: string): Promise<boolean[][]> {
    const qr = await QRCode.create(data, { errorCorrectionLevel: 'H' });
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
