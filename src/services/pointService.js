const QRCode = require('qrcode');

class PointService {
  constructor(repo) {
    this.repo = repo;
  }

  async createPointService(data) {
    return await this.repo.createRepository(data);
  }

  async getAllPointsService() {
    return await this.repo.findAllRepository();
  }

  async getPointDetailService(id) {
    const point = await this.repo.findByIdRepository(id);
    if (!point) throw new Error('point not found');
    return point;
  }
  async getQrCodeImage(id) {
    const point = await this.repo.findByIdRepository(id);

    if (!point) {
      const error = new Error('找不到該巡檢點');
      error.statusCode = 404;
      throw error;
    }

    if (!point.code) {
      const error = new Error('該巡檢點尚未配置二維碼識別碼(UUID)');
      error.statusCode = 400;
      throw error;
    }

    const qrOptions = {
      errorCorrectionLevel: 'H', // 容錯率達 30%，無懼現場油污粉塵
      margin: 2,
      width: 250,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    };

    const base64Image = await QRCode.toDataURL(point.code, qrOptions);

    return {
      pointId: point.id,
      pointName: point.name,
      uuid: point.code,
      qrCodeBase64: base64Image
    };
  }
}

module.exports = PointService;