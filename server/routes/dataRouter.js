/**
 * ************************************
 *
 * @module dataRouter
 * @author Mike Basta
 * @date 1/29/2024
 * @description routes for /data path - /getUser
 *
 * ************************************
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');



router.get('/getUser', authController.verifyToken, userController.findUser, (req, res, next)=>{
  res.status(200).json(res.locals.userFound);
});




module.exports = router;





//getUser - needs verifyUser before calling controller to get User data


//findUser