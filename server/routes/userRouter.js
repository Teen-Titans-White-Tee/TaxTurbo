// Middleware for user signup & sign in
const express = require('express')
const userController = require('../controllers/userController')
const data = require('../controllers/dataRetrieval')
const authController = require('../controllers/authController'); 
const calc = require('../controllers/calcController')
const router = express.Router()


//ROUTE FOR SIGN UP

router.post ('/', userController.newUser ,data.stateBrackets, data.fedBrackets , calc.allTaxes, userController.createUser, authController.signupUser, (req, res) => {
  res.status(200).json({ success: true, message: 'Request processed successfully', locals: res.locals });
});

module.exports = router;

//authController.signupUser, authController.loginUser,