require('dotenv').config();
const { Person } = require('../models/mongooseModels');  
const jwt = require('jsonwebtoken'); 
const secret = '7hDkL$2pA!sFg@9rJm&5tYiX';
const bcrypt = require('bcrypt');
const cookie = require('cookie');
 
const authController = {};

// this creates json web token
const createToken = (_id) => { 
  if (! secret) {
    throw Error('Secret key is missing. Make sure process.env.SECRET is defined.');
  }
  return jwt.sign({_id}, secret, {expiresIn: '1d'});
};

// signup user 
// authController.signupUser = async (req, res, next) => { 

//   const {email} = req.body;

//   console.log ('Email from the request body in jwt token creation', email);

//   // try to sign user up using signup method 
//   try {
//     // const user = await models.Person.signup(firstName, lastName, password, email);  
//     const user = await Person.findOne({email});

//     console.log ('Found a user to create a token with their document id', user);

//     // create a token 
//     const token = createToken(user._id);
//     // Send the token as a cookie
//     // res.cookie('token', token, {httpOnly: true});

//     res.locals.token = token;


//     //expires: new Date(Date.now() + 24 * 60 * 60 * 1000), secure: true, sameSite: 'Strict'

//     return next();


//     // res.status(200).json({email, token});
//   } catch (error) {
//     res.status(400).json({error: error.message});
//   }
// }; 

// login user 
authController.loginUser = async (req,res,next) => { 
  const { email, password } = req.body; 

  console.log('in authController.loginUser req.body ', req.body);

  try {
    // const user = await Person.login(email, password);  
    const user = await Person.findOne({email});
    
    if(!user) {
      throw Error('Incorrect email or password');
    } 

    const hash = user.password  

    const match = await bcrypt.compare(password, hash);

    if (match) {
      const token = createToken(user._id);

      // const cookieString = cookie.serialize('jwtToken', token, {
      //   // httpOnly: true,
      //   // secure: true,
      // });
      // console.log('Serialized cookie:', cookieString);
      // res.setHeader('Set-Cookie', cookieString);
      res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      console.log('token>>>>>>>>>>>>>>>>>>>>> ', token);
      // console.log('req', req)
      res.locals.token = token

      return next()
      // return res.status(200).json({token});
    } else {
      throw Error('Incorrect email or password');
    } 
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}; 

/* Controller that verifies token */

authController.verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  // const authorizationHeader = req.headers['authorization'];

  // if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    // Token not provided in the correct format
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  // const token = authorizationHeader.split(' ')[1];
  // const token = req.cookies.jwtToken;
  const token = req.cookies.jwtToken;
  // console.log('req.cookies------------>', req.headers.cookie)
  // console.log('req ', req.headers['cookie']);
  // console.log("in authController.verifyToken ", token)

  if (token === undefined) return res.status(403).json({error: 'Unauthorized'})

  try {
    // Verify the token
    const decoded = jwt.verify(token, secret);
    
    // Attach the decoded user information onto req.user
    req.user = decoded;
    
    console.log('THIS IS THE DATA DECODED', decoded);
    
    return next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authController;