const express = require('express');
const router = express.Router();


const Repo = require('../repositories/taskRepository');
const Service = require('../services/taskService');
const Controller = require('../controllers/taskController');

const repo = new Repo();
const service = new Service(repo);

router.get('/today', Controller.getMyTodayTasks(service));
router.get('/detail', Controller.findByIdRepository(service));
router.get('/list', Controller.findAllController(service));

module.exports = router;