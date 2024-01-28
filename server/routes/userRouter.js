// Middleware for user signup & sign in
const express = require('express')
const userController = require('../Controllers/userController.js')
const data = require('../Controllers/DataRetrieval.js')
const authController = require('../Controllers/authController.js'); 
const calc = require('../Controllers/CalcController.js')
const router = express.Router()


//ROUTE FOR SIGN UP

router.post ('/', userController.newUser ,data.stateBrackets, data.fedBrackets , calc.allTaxes, userController.createUser, (req, res) => {
  res.status(200).json({ success: true, message: 'Request processed successfully', locals: res.locals });
});


module.exports = router;