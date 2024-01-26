const express = require('express');

const router = express.Router();

const authController = require ('../Controllers/authController.js');
const userController = require ('../Controllers/userController.js');


router.get('/', authController.verifyToken, userController.findUser, (req, res) => {
  //should contain resulting data from the document matching the token.
  res.status(200).json(res.locals.userData);



});

module.exports = router;