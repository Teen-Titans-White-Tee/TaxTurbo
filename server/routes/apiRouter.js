const express = require('express');
const router = express.Router();
const plaidController = require('../Controllers/plaidController');
const plaidRouter = require('./plaidRouter');


router.use('/plaid',plaidRouter, (req, res)=>{
  res.send('Plaid Endpoint Hit');
});


router.use('/user', (req, res, next)=>{
  res.json({firstName: 'Ellie', lastName:'Christopher'});
});



module.exports = router;