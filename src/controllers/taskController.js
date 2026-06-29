const getMyTodayTasks = (service) => async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const tasks = await service.getTodayTasksByUser(currentUserId);

    res.status(201).json({
      success: true,
      data: tasks
    });

  } catch (error) {
    next(error);
  }
}

const findByIdRepository = (service) => async (req, res, next) => {
  try {
    const result = await service.getTaskDetailService(req.query.id);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

const findAllController = (service) => async (req, res, next) => {
  try {
    const result = await service.getAllService(req.query);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyTodayTasks,
  findByIdRepository,
  findAllController
};