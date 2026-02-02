const bulkCreateResultController = (service) => async (req, res, next) => {
  try {
    const result = await service.bulkCreateResultService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const findAllResultController = (service) => async (req, res, next) => {
  try {
    const result = await service.getAllResultService();
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { bulkCreateResultController, findAllResultController };