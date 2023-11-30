const { Router } = require('express');


const getUsers = require('../controllers/getUsers');
const getUser = require('../controllers/getUser')
const {loginUser , postUser} =require('../controllers/loginUser')
const getServices = require('../controllers/getServices');
const getCategories = require('../controllers/getCategories');
const searchServices = require('../controllers/searchServices');




const setTurno = require('../controllers/setTurno');
const getVehiculos = require('../controllers/getVehiculos');
const postVehiculos = require('../controllers/postVehiculos');

const router = Router();
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users',  postUser);
router.post('/login', loginUser);
router.get('/categories', getCategories);
router.get('/services', getServices);
router.get('/services/search/', searchServices);
router.get('/services/:idService', getServices);
router.get('/turno/:idTurno', setTurno);
router.get('/vehiculos', getVehiculos);
router.post('/vehiculos', postVehiculos);

module.exports = router;