const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// router.get('/pass-rate', dashboardController.getPassRate);
router.get('/ranking/items', dashboardController.getItemPassRateRanking);
router.get('/ranking/points', dashboardController.getPointPassRateRanking);
router.get('/ranking/plans', dashboardController.getPlanPassRateRanking);
router.get('/record/status', dashboardController.getRecordStatus);

module.exports = router;