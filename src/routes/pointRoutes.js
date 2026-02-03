const express = require('express');
const router = express.Router();

const PointRepo = require('../repositories/pointRepository');
const PointService = require('../services/pointService');
const PointController = require('../controllers/pointController');

const repo = new PointRepo();

const service = new PointService(repo);

router.post('/create', PointController.createPointController(service));
router.get('/list', PointController.findAllController(service));

module.exports = router;