const QRCode = require('qrcode');

const createPointController = (service) => async (req, res, next) => {
  try {
    const result = await service.createPointService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const findAllController = (service) => async (req, res, next) => {
  try {
    const result = await service.getAllPointsService();
    const qrOptions = {
      errorCorrectionLevel: 'H', // 高容錯率
      margin: 2,
      width: 200,
      color: { dark: '#000000', light: '#FFFFFF' }
    };

    const pointsWithQrCode = await Promise.all(
      result.map(async (point) => {
        let qrCodeBase64 = null;

        if (point.code) {
          try {
            qrCodeBase64 = await QRCode.toDataURL(point.code, qrOptions);
          } catch (qrError) {
            console.error(`點位 ID ${point.id} 轉碼失敗:`, qrError);
            // 轉碼失敗時給 null，不中斷其他點位的處理
          }
        }

        const pointData = point.get({ plain: true });

        return {
          ...pointData,
          qrCodeBase64: qrCodeBase64,
        };
      })
    );

    // return pointsWithQrCode;
    res.json({ success: true, data: pointsWithQrCode });
  } catch (err) {
    next(err);
  }
};

const generatePointQrCode = (service) => async (req, res) => {
  try {
    const { id } = req.params;

    const qrCodeData = await service.getQrCodeImage(id);

    return res.json({
      success: true,
      data: qrCodeData
    });

  } catch (error) {
    console.error(`[PointController][generatePointQrCode] 發生錯誤:`, error);

    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || '伺服器內部錯誤，無法產生 QR Code'
    });
  }
};

module.exports = { createPointController, findAllController, generatePointQrCode };