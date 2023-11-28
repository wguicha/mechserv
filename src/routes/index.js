const { Router } = require('express');
const { postUser} = require('../controllers/postUser');
const getUsers = require('../controllers/getUsers');
const getUser = require('../controllers/getUser')
const login = require('../controllers/login');
const getServices = require('../controllers/getServices');
const getCategories = require('../controllers/getCategories');
const searchServices = require('../controllers/searchServices');
const Home = require('../controllers/Home')
const auth =require('../middleware/middleware');
const setTurno = require('../controllers/setTurno');

const router = Router();
router.get('/users', getUsers);
router.get('/users/:userId', getUser);

router.get('/home', auth ,Home )
router.post('/users',  postUser);
router.post('/login', login);
router.get('/categories', getCategories);
router.get('/services', getServices);
router.get('/services/search/', searchServices);
router.get('/services/:idService', getServices);
router.get('/turno/:idTurno', setTurno);

module.exports = router;