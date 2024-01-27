// Middleware for user signup & sign in
const express = require('express')
const authController = require('./Controllers/authController'); 
const router = express.Router()

//ROUTE FOR Login
router.post ('/login', authController.loginUser, (req, res) => {
  res.status(200).json({email, token});
});

module.exports = router;
