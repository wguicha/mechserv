const { Router } = require('express');
const { postUser, verifyToken } = require('../controllers/postUser');
const getUsers = require('../controllers/getUsers');
const login = require('../controllers/login');
const getServices = require('../controllers/getServices');

const router = Router();
router.get('/users', getUsers);
router.post('/users',  postUser);
router.post('/login', login);
router.get('/services', getServices);


module.exports = router;