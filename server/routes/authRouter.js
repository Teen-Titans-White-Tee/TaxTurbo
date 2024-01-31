// Middleware for user signup & sign in
const express = require('express')
const authController = require('../Controllers/authController.js'); 
const userController = require ('../Controllers/userController.js');
const router = express.Router();
const data = require('../Controllers/DataRetrieval.js')
const calc = require('../Controllers/CalcController.js')

//ROUTE FOR Login
router.post ('/login', authController.loginUser, (req, res) => {
  res.status(200).json({toke});
});

router.get('/verify', 
  authController.verifyToken, 
  userController.findUser, 
  (req, res) => {
    console.log('verify endpoint')
    return res.status(200).json(res.locals);
});

router.post ('/signup', userController.newUser ,data.stateBrackets, data.fedBrackets , calc.allTaxes, userController.createUser, (req, res) => {
  res.status(200).json({ success: true, message: 'Request processed successfully', locals: res.locals });
});


module.exports = router;
