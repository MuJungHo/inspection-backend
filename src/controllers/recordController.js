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

module.exports = { findAllRecordController, createController };