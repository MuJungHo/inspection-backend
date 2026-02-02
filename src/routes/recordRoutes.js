const express = require('express');
const router = express.Router();

const Repo = require('../repositories/recordRepository');
const Service = require('../services/recordService');
const Controller = require('../controllers/recordController');

const repo = new Repo();
const service = new Service(repo);

router.post('/bulk', Controller.bulkCreateResultController(service));
router.get('/list', Controller.findAllResultController(service));

module.exports = router;