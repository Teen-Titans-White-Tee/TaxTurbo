const express = require('express');
const router = express.Router();
const {generateLinkToken} = require('../Controllers/plaidController');


router.post('/generate_link_token',generateLinkToken, async (req, res, next) => {
  
  return res.status(200).json({token:res.locals.token});
});


module.exports = router;