const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetail, updatePassword, updateProfie, getAllUser, getSingleUser, updateUserRole } = require('../controllers/userController');
const { isAuthenticatedOwner, authorizeRoles } = require('../middleware/auth');

const router = express.Router();
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get( isAuthenticatedOwner , getUserDetail)
router.route("/password/update").put( isAuthenticatedOwner , updatePassword)
router.route("/me/update").put( isAuthenticatedOwner , updateProfie)
router.route("/admin/users").get( isAuthenticatedOwner , authorizeRoles("admin") , getAllUser)
router.route("/admin/user/:id").get( isAuthenticatedOwner , authorizeRoles("admin") , getSingleUser).put(isAuthenticatedOwner , authorizeRoles("admin") , updateUserRole )

 module.exports = router;