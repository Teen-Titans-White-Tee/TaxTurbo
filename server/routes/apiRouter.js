const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../Controllers/userController.js');


router.use('/plaid', (req, res, next)=>{
  res.send('Plaid Endpoint Hit');
});


router.use('/user', (req, res)=>{
  console.log('inside apiRouter');
  res.status(200).json({
    firstName: 'Eleanor',
    lastName: 'ChristoFrye',
    password: 'Eleanor',
    filingStatus: 'single',
    state: 'colorado',
    email: 'noneya@business.com',
    estimatedIncome: 200000,
    businessExpenses: 1000,
    preTaxRetirementContributions: 1000,
    medicareTax: 1000,
    ssiTax: 1000,
    fedTax: 2000,
    stateTax: 5000,
  });
});

router.use('/expenses', (req, res, next) => {
  res.status(200).json(path.resolve(__dirname, '../Data/mockTransactions.json'));
});


module.exports = router;