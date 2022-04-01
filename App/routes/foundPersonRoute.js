const express = require('express');
const { createfoundPerson, getAllFoundPerson } = require('../controllers/foundPersonController.js');
const router = express.Router();

router.route('/foundPerson').post(createfoundPerson).get(getAllFoundPerson);

module.exports = router;