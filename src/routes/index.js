const { Router } = require('express');
const { postUser} = require('../controllers/postUser');
const getUsers = require('../controllers/getUsers');
const login = require('../controllers/login');
const getServices = require('../controllers/getServices');
const getCategories = require('../controllers/getCategories');
const searchServices = require('../controllers/searchServices');
const Home = require('../controllers/Home')
const auth =require('../middleware/middleware');
const setTurno = require('../controllers/setTurno');
const getVehiculos = require('../controllers/getVehiculos');
const postVehiculos = require('../controllers/postVehiculos');

const router = Router();
router.get('/users', getUsers);
router.get('/home', auth ,Home )
router.post('/users',  postUser);
router.post('/login', login);
router.get('/categories', getCategories);
router.get('/services', getServices);
router.get('/services/search/', searchServices);
router.get('/services/:idService', getServices);
router.get('/turno/:idTurno', setTurno);
router.get('/vehiculos', getVehiculos);
router.post('/vehiculos', postVehiculos);

module.exports = router;