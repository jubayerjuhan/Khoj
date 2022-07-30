const express = require("express");
const {
  registerUser,
  login,
  forgetPassword,
  resetPassword,
  updateBio,
  updateProfilePicture,
  singleUser,
  loadUser,
  storeUserInfo,
  updateUser,
} = require("../controllers/usercontroller.js");
const {
  authorizeUser,
  authorizeAdmin,
} = require("../middleware/authorizeUser.js");
const router = express.Router();

router.route("/storeUser").post(storeUserInfo);
router.route("/updatedp").put(updateProfilePicture);
router.route("/updateUser").put(updateUser);
router.route("/me").get(loadUser);

module.exports = router;
