const findAllRecordController = (service) => async (req, res, next) => {
  try {
    const result = await service.getAllRecordService();
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const createController = (service) => async (req, res, next) => {
  try {
    const result = await service.createService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const submitBulkRecords = (service) => async (req, res) => {
  try {
    const { planId, records, taskId } = req.body;

    const inspectorId = req.user.id;

    if (!planId || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({
        success: false,
        message: '表單資料不完整'
      });
    }

    await service.processAndSaveRecords(taskId, planId, inspectorId, records);

    return res.status(200).json({
      success: true,
      message: '巡檢紀錄已成功送出'
    });

  } catch (error) {
    console.error('Submit Task Records Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: '伺服器發生錯誤，無法儲存紀錄'
    });
  }
};
module.exports = { findAllRecordController, createController, submitBulkRecords };