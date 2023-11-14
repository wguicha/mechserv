const { Router } = require('express');
const getUsers = require('../controllers/getUsers.js')

const router = Router();
router.get('/users', getUsers)



module.exports = router;