import { QrCodeService } from './qr-code.service';

describe('QrCodeService', () => {
  let testee: QrCodeService;

  beforeEach(() => {
    testee = new QrCodeService();
  });

  describe('generateQrCode', () => {
    it('should generate a QR code bit matrix', () => {
      // arrange
      const data = 'a';

      // act
      const result = testee.generateQrCode(data);

      // assert
      expect(result.length).toBe(21);
      expect(result[0].length).toBe(result.length);
    });
  });
});
