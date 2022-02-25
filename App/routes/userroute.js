const express = require('express');
const { registerUser, login, forgetPassword, resetPassword, updateBio, updateProfilePicture, singleUser, loadUser } = require('../controllers/usercontroller.js');
const { authorizeUser, authorizeAdmin } = require('../middleware/authorizeUser.js');
const router = express.Router();


router.route('/sign-up').post(registerUser)
router.route('/login').post(login)
router.route('/forget-password').post(forgetPassword)
router.route('/reset-password/:token').put(resetPassword)
router.route('/update-bio').put(authorizeAdmin, authorizeUser, updateBio)
router.route('/update-profile-picture').put(authorizeUser, updateProfilePicture)
router.route('/me').get(authorizeUser, loadUser)

module.exports = router;