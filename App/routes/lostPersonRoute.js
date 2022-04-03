const express = require('express');
const { createLostDocument, getAllLostDocument } = require('../controllers/lostDocumentController.js');
const { createLostPerson, getAllLostPerson } = require('../controllers/lostPersonController.js');
const router = express.Router();


router.route('/lostPerson').post(createLostPerson).get(getAllLostPerson)
router.route('/losDocument').post(createLostDocument).get(getAllLostDocument)


module.exports = router;