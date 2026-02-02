const express = require('express');
const router = express.Router();


const Repo = require('../repositories/userRepository');
const Service = require('../services/userService');
const Controller = require('../controllers/userController');

const repo = new Repo();
const service = new Service(repo);

router.post('/create', Controller.createUserController(service));
router.get('/list', Controller.findAllController(service));

module.exports = router;