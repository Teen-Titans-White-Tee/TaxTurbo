const express = require('express');
const router = express.Router();



router.use('/plaid', (req, res, next)=>{
  res.send('Plaid Endpoint Hit');
});


router.use('/user', (req, res, next)=>{
  res.json({firstName: 'Ellie', lastName:'Christopher'});
});



module.exports = router;