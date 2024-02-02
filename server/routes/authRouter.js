// Middleware for user signup & sign in
const express = require('express');
const authController = require('../controllers/authController'); 
const userController = require ('../controllers/userController');
const router = express.Router();
const data = require('../Controllers/DataRetrieval');
const calc = require('../Controllers/CalcController');

//ROUTE FOR Login
router.post ('/login', authController.loginUser, (req, res) => {
  return res.status(200).json({token: res.locals.token});
});

router.get('/verify', 
  authController.verifyToken, 
  userController.findUser, 
  (req, res) => {
    return res.status(200).json(res.locals);
  });

router.post ('/signup', userController.newUser ,data.stateBrackets, data.fedBrackets , calc.allTaxes, userController.createUser, (req, res) => {
  res.status(200).json({ success: true, message: 'Request processed successfully', locals: res.locals });
});


module.exports = router;
