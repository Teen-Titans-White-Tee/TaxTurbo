const express = require('express');
const router = express.Router();
const path = require('path');


router.use('/plaid', (req, res, next)=>{
  res.send('Plaid Endpoint Hit');
});


router.use('/user', (req, res, next)=>{
  res.json({firstName: 'Ellie', lastName:'Christopher'});
});

router.use('/expenses', (req, res, next) => {
  res.status(200).json(path.resolve(__dirname, '../Data/mockTransactions.json'));
});


module.exports = router;