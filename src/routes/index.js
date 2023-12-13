const { Router } = require('express');

const getUsers = require('../controllers/getUsers');
const getUser = require('../controllers/getUser')
const getUserByEmail = require('../controllers/getUserByEmail')
const postUser =require('../controllers/postUser')
const getServices = require('../controllers/getServices');
const postService = require('../controllers/postService');
const getCategories = require('../controllers/getCategories');
const searchServices = require('../controllers/searchServices');
const Home = require('../controllers/Home')
const auth =require('../middleware/middleware');
const setTurno = require('../controllers/setTurno');
const getVehiculos = require('../controllers/getVehiculos');
const getVehiculo = require('../controllers/getVehiculo');
const postVehiculos = require('../controllers/postVehiculos');
const postOrder = require('../controllers/postOrder');
const setOrder = require('../controllers/setOrder');
const getOrders = require('../controllers/getOrders');
const getReviews = require('../controllers/getReviews');
const getReview = require('../controllers/getReview');
const postReviews = require('../controllers/postReviews');

const router = Router();
router.get('/users', getUsers);
router.get('/users/:email', getUserByEmail);
router.get('/users/:userId', getUser);
router.post('/users',  postUser);

router.get('/home', auth ,Home )

router.get('/categories', getCategories);

router.get('/services', getServices);
router.get('/services/search/', searchServices);
router.get('/services/:idService', getServices);
router.post('/services', postService);
router.post('/services/:idService', postService);

router.get('/turno/:idTurno', setTurno);

router.get('/vehiculos', getVehiculos);
router.post('/vehiculos', postVehiculos);
router.get('/vehiculos/:userId', getVehiculo);

router.post('/order', postOrder);
router.get('/orders', getOrders);
router.get('/orders/:idUser', getOrders);
router.get('/orders/set/:idOrder', setOrder);

router.get('/reviews', getReviews);
router.post('/reviews', postReviews);
router.get('/reviews/:userId', getReview);

module.exports = router;