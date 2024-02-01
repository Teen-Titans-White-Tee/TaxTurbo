const express = require('express');
const router = express.Router();
const {generateLinkToken, exchangePublicForAccessToken} = require('../Controllers/plaidController');


router.post('/generate_link_token',generateLinkToken, async (req, res, next) => {
  
  return res.status(200).json({token:res.locals.token});
});

router.post('/exchange_token',exchangePublicForAccessToken, (req, res)=>{
  res.status(200).json({message: 'Exchange Successful'});
} );


module.exports = router;