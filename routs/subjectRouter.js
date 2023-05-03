const express = require("express");
const authController = require("../controller/authController");
const subjectController = require("../controller/subjectController");
const router = express.Router();

router.post(
  "/addSubject",
  authController.protect,
  subjectController.createSubject
);
router.get(
  "/findSubject",
  authController.protect,
  subjectController.getAllSubject
);
router
  .route("/:id")
  .delete(authController.protect, subjectController.deleteSubject)
  .patch(authController.protect, subjectController.updateSubject);

module.exports = router;
