const express = require('express');
const router = express.Router();
const {generateLinkToken} = require('../Controllers/plaidController');


router.post('/generate_link_token',generateLinkToken, async (req, res, next) => {
  try {
    return res.json({ todo: 'Generate a link token' });
  } catch (error) {
    console.log(
      'Running into an error! Note that if you have an error when creating a ' +
          'link token, it\'s frequently because you have the wrong client_id ' +
          'or secret for the environment, or you forgot to copy over your ' +
          '.env.template file to.env.'
    );
    next(error);
  }
});


module.exports = router;