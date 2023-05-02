const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
    "/registration",
    authMiddleware.createUserMiddlewa,
    authController.registration
);
router.post("/login", authController.login);
router.get("/", authController.protect, userController.getAllUser);
router.get('/userProfile', authController.protect, userController.userProfile)
router
    .route("/:id")
    .delete(
        authController.protect,
        authController.restrictTo("admin"),
        userController.deleteUser
    )
    .patch(
        authController.protect,
        authController.restrictTo("admin"),
        userController.updateUser
    );


module.exports = router;
