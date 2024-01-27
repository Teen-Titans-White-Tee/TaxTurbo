// Middleware for user signup & sign in
const express = require('express')
const authController = require('./Controllers/authController'); 
const userController = require('./Controllers/userController')
const data = require('./Controllers/DataRetrieval')
const calc = require('./Controllers/CalcController')
const router = express.Router()

//ROUTE FOR Login
router.post ('/login', authController.loginUser, (req, res) => {
  res.status(200).json({email, token});
});

router.post ('/signup', userController.newUser ,data.stateBrackets, data.fedBrackets , calc.allTaxes, userController.createUser, (req, res) => {
  res.status(200).json({ success: true, message: 'Request processed successfully', locals: res.locals });
});

router.get('/verify', 
  authController.verifyToken, 
  userController.findUser, 
(req, res) => {
  //should contain resulting data from the document matching the token.
  return res.status(200).json(res.locals);
});

module.exports = router;

module.exports = router;
