const express = require('express');
const router = express.Router();


const Repo = require('../repositories/TaskRepository');
const Service = require('../services/taskService');
const Controller = require('../controllers/taskController');

const repo = new Repo();
const service = new Service(repo);

router.get('/today', Controller.getMyTodayTasks(service));

module.exports = router;