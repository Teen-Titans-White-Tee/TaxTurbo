// Middleware for transactions
const userController = require('..Controller.js');
const data = require('../controllers/dataRetrieval.js');
const authController = require('../controllers/authController.js'); 
const calc = require('../controllers/calcController.js');

const express = require('express');

const router = express.Router();


router.post('/', authController.verifyToken, userController.findUser, calc.newNumbers, calc.storage, data.stateBrackets, data.fedBrackets , calc.allTaxes, calc.transactionOwed, userController.updateUser, (req, res) =>{
  res.status(200).json({userTransactionData:  res.locals.responseFromUpdatingDocument, owedTaxesOfTransaction: res.locals.transactionOwed });
});

module.exports = router;