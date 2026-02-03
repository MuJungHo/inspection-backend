const express = require('express');
const router = express.Router();

const Repo = require('../repositories/itemRepository');
const Service = require('../services/itemService');
const Controller = require('../controllers/itemController');

const repo = new Repo();
const service = new Service(repo);

router.post('/create', Controller.createItemController(service));
router.get('/list', Controller.getItemsController(service));
router.get('/listByPoint', Controller.getItemsByPointController(service));

module.exports = router;