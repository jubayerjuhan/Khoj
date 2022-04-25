const express = require('express');
const { createLostDocument, getAllLostDocument } = require('../controllers/lostDocumentController.js');
const { createLostPerson, getAllLostPerson, lostPersonSearch } = require('../controllers/lostPersonController.js');
const { verifyUser } = require('../middleware/verifyUser.js');
const router = express.Router();


router.route('/lostPerson').post(verifyUser, createLostPerson).get(verifyUser, getAllLostPerson)
router.route('/lostPerson/:keyword').get(verifyUser, lostPersonSearch)
router.route('/lostDocument').post(createLostDocument).get(getAllLostDocument)


module.exports = router;