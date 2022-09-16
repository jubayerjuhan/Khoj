const express = require("express");
const {
  createfoundPerson,
  getAllFoundPerson,
  createFoundDocument,
  getAllFoundDocument,
  searchFoundPerson,
  getImageLink,
  getSingleFoundPerson,
} = require("../controllers/foundPersonController.js");
const { verifyUser } = require("../middleware/verifyUser.js");
const router = express.Router();

router
  .route("/foundPerson")
  .post(verifyUser, createfoundPerson)
  .get(getAllFoundPerson);
router.route("/foundPersons/:id").get(verifyUser, getSingleFoundPerson);
router.route("/foundPerson/:keyword").get(verifyUser, searchFoundPerson);
router
  .route("/foundDocument")
  .post(verifyUser, createFoundDocument)
  .get(getAllFoundDocument);
router.route("/photo").post(getImageLink);

module.exports = router;
