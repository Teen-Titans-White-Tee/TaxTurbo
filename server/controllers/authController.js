process.env.SECRET = '7hDkL$2pA!sFg@9rJm&5tYiX';
require('dotenv').config();
const models = require('../models/mongooseModels');  
const jwt = require('jsonwebtoken'); 
 
// this creates json web token
const createToken = (_id) => { 
  if (!process.env.SECRET) {
    throw Error('Secret key is missing. Make sure process.env.SECRET is defined.');
  }
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'});
};

// signup user 
const signupUser = async (req, res, next) => { 

  const { firstName, lastName, password, email} = req.body;

  // try to sign user up using signup method 
  try {
    // const user = await models.Person.signup(firstName, lastName, password, email);  
    const user = await models.Person.findOne({email});

    console.log ('Found a user to create a token with their document id', user);

    // create a token 
    const token = createToken(user._id);
    // Send the token as a cookie
    // res.cookie('token', token, {httpOnly: true});


    //expires: new Date(Date.now() + 24 * 60 * 60 * 1000), secure: true, sameSite: 'Strict'

    return next();


    // res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}; 

// login user 
const loginUser = async (req,res) => { 
  const { email, password } = req.body; 
  try {
    const user = await models.Person.login(email, password);  

    // create token
    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }

}; 

/* Controller that verifies token */

const verifyToken = (req, res, next ) => {

  //EXTRACT TOKEN FROM COOKIES COMING IN FROM THE CLIENT
  const token = req.cookies.token || ''; 

  if (!token) {
    //TOKEN NOT PROVIDED
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    //ATTACHING THE INFO FROM TOKEN ONTO REQ.USER;

    req.user = decoded;
    console.log ('Value of req.user after being decoded using jwt');

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  
}

module.exports = { loginUser, signupUser, verifyToken };