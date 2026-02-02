const createUserController = (service) => async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const user = await service.createUserService(username, email);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const findAllController = (service) => async (req, res, next) => {
  try {
    const result = await service.getAllUserService();
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUserController, findAllController
};