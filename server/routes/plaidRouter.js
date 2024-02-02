const express = require('express');
const router = express.Router();
const {generateLinkToken, exchangePublicForAccessToken, getTransactions} = require('../Controllers/plaidController');
const {verifyToken} = require('../controllers/authController');


router.post('/generate_link_token',verifyToken,generateLinkToken, async (req, res, next) => {
  
  return res.status(200).json({token:res.locals.token});
});

router.post('/exchange_token',verifyToken,exchangePublicForAccessToken, (req, res)=>{
  res.status(200).json({message: 'Exchange Successful'});
} );

router.get('/getTransactions', verifyToken, getTransactions, (req,res)=>{
  const data = res.locals.transactions;
  return res.status(200).json({data});
});

module.exports = router;