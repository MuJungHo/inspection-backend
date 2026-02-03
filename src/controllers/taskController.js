const getMyTodayTasks = (service) => async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const tasks = await service.getTodayTasksByUser(currentUserId);
    
    res.status(201).json({
      success: true,
      date: new Date().toISOString().split('T')[0],
      count: tasks.length,
      data: tasks
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMyTodayTasks
};