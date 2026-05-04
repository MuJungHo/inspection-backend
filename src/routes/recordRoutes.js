const express = require('express');
const router = express.Router();

const Repo = require('../repositories/recordRepository');
const Service = require('../services/recordService');
const Controller = require('../controllers/recordController');

const repo = new Repo();
const service = new Service(repo);

router.post('/create', Controller.createController(service));
router.get('/list', Controller.findAllRecordController(service));

module.exports = router;