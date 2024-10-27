const express = require('express');
const {  authorizeRoles } = require('../middleware/auth');
const {  registerUser, registerAnonymousUser, loginAnonymousUser, loginUser, logout, getAllUsers,  } = require('../marketplaceController/UserController');

const router = express.Router();
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)

router.route("/register-anonymous").post(registerAnonymousUser)
router.route("/login-anonymous").post(loginAnonymousUser)
router.route("/users").get(getAllUsers)

module.exports=router;