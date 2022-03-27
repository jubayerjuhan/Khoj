const express = require('express');
const { createLostPerson, getAllLostPerson } = require('../controllers/lostPersonController.js');
const router = express.Router();


router.route('/lostPerson').post(createLostPerson).get(getAllLostPerson)

module.exports = router;