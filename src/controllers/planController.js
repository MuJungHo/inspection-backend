const createPlanController = (service) => async (req, res, next) => {
  try {
    const result = await service.createPlanService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const findAllController = (service) => async (req, res, next) => {
  try {
    const result = await service.getAllPlansService();
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const getPlanController = (service) => async (req, res, next) => {
  try {
    const result = await service.getPlanDetailService(req.params.id);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const assignInspectorController = (service) => async (req, res, next) => {
  try {
    const result = await service.assignInspectorService(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPlanController, getPlanController, findAllController, assignInspectorController };