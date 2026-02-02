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
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};


module.exports = { createPointController, findAllController };