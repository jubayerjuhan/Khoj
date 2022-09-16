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
  getAllUser,
} = require("../controllers/usercontroller.js");
const {
  authorizeUser,
  authorizeAdmin,
} = require("../middleware/authorizeUser.js");
const router = express.Router();

router.route("/storeUser").post(storeUserInfo);
router.route("/updatedp").put(updateProfilePicture);
router.route("/users").get(getAllUser);
router.route("/updateUser").put(updateUser);
router.route("/me").post(loadUser);

module.exports = router;
