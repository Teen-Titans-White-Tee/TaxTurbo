// Middleware for user signup & sign in
const express = require('express')
<<<<<<< HEAD
const authController = require('../Controllers/authController.js'); 
const userController = require ('../Controllers/userController.js');
const router = express.Router();
const data = require('../Controllers/DataRetrieval.js')
const calc = require('../Controllers/CalcController.js')

//ROUTE FOR Login
router.post ('/login', authController.loginUser, (req, res) => {
  res.status(200).json({email, token});
=======
const authController = require('../Controllers/authController'); 
const userController = require ('../Controllers/userController.js');
const router = express.Router()
const data = require('../Controllers/DataRetrieval')
const calc = require('../Controllers/CalcController')

//ROUTE FOR Login
router.post ('/login', authController.loginUser, (req, res) => {
  return res.status(200).json({token: res.locals.token})
>>>>>>> 1de179896067e59183ff872c0fc34fa92ec05760
});

router.get('/verify', 
  authController.verifyToken, 
  userController.findUser, 
  (req, res) => {
<<<<<<< HEAD
    console.log('verify endpoint')
=======
>>>>>>> 1de179896067e59183ff872c0fc34fa92ec05760
    return res.status(200).json(res.locals);
});

router.post ('/signup', userController.newUser ,data.stateBrackets, data.fedBrackets , calc.allTaxes, userController.createUser, (req, res) => {
  res.status(200).json({ success: true, message: 'Request processed successfully', locals: res.locals });
});


module.exports = router;
