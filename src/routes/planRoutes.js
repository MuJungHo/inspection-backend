const express = require('express');
const router = express.Router();

const PlanRepo = require('../repositories/planRepository');
const PlanService = require('../services/planService');
const PlanController = require('../controllers/planController');

const repo = new PlanRepo();

const service = new PlanService(repo);

router.post('/create', PlanController.createPlanController(service));
router.get('/list', PlanController.findAllController(service));
router.post('/assign', PlanController.assignInspectorController(service));

module.exports = router;