// Middleware for transactions
const userController = require('../Controllers/userController.js');
const data = require('../Controllers/DataRetrieval.js');
const authController = require('../Controllers/authController.js'); 
const calc = require('../Controllers/CalcController.js');

const express = require('express');

const router = express.Router();


router.post('/', authController.verifyToken, userController.findUser, calc.newNumbers, calc.storage, data.stateBrackets, data.fedBrackets , calc.allTaxes, calc.transactionOwed, userController.updateUser, (req, res) =>{
  res.status(200).json({userTransactionData:  res.locals.responseFromUpdatingDocument, owedTaxesOfTransaction: res.locals.transactionOwed });
});

module.exports = router;