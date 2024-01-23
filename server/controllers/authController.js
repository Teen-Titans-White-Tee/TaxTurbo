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

  const {email} = req.body;

  console.log ('Email from the request body in jwt token creation', email);

  // try to sign user up using signup method 
  try {
    // const user = await models.Person.signup(firstName, lastName, password, email);  
    const user = await models.Person.findOne({email});

    console.log ('Found a user to create a token with their document id', user);

    // create a token 
    const token = createToken(user._id);
    // Send the token as a cookie
    // res.cookie('token', token, {httpOnly: true});

    res.locals.token = token;


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

const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    // Token not provided in the correct format
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);
    
    // Attach the decoded user information onto req.user
    req.user = decoded;
    
    console.log('THIS IS THE DATA DECODED', decoded);
    
    return next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = {verifyToken, loginUser, signupUser};