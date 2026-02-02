const createItemController = (service) => async (req, res, next) => {
  try {
    const result = await service.createItemService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const getItemsController = (service) => async (req, res, next) => {
  try {
    const result = await service.getAllItemsService();
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { createItemController, getItemsController };