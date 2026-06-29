const createItemController = (service) => async (req, res, next) => {
  try {
    const result = await service.createItemService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    console.log(err)
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

const getItemsByPointController = (service) => async (req, res, next) => {
  try {
    const { pointId } = req.query;
    const result = await service.findAllItemByPointId(pointId);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const deleteItemController = service => async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const result = await service.deleteItemService(itemId);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const updateItemController = service => async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const data = req.body;
    const result = await service.updateItemService(itemId, data);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { createItemController, getItemsController, getItemsByPointController, deleteItemController, updateItemController };