/**
 * ************************************
 *
 * @module plaidController
 * @description  Generates unique access token for user to Plaid API and pulls user transaction data
 *
 * ************************************
 */

const {Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();
const userModels = require('../models/mongooseModels');
const {PLAID_CLIENT, PLAID_SECRET,PLAID_ENV } = process.env;

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});
const plaidClient = new PlaidApi(plaidConfig);
const plaidController = {};

plaidController.generateLinkToken = async (req, res, next)=>{
  const id = res.locals.id;
  const CURR_USER_ID = id;
  const linkTokenConfig = {
    user: { client_user_id: CURR_USER_ID },
    client_name: 'Plaid Tutorial',
    language: 'en',
    products: ['auth','transactions'],
    country_codes: ['US'],
    webhook: 'https://www.example.com/webhook',
  };
  try{
    const tokenResponse = await plaidClient.linkTokenCreate(linkTokenConfig);
    
    const tokenData = tokenResponse.data.link_token;
    
    res.locals.token = tokenData;
    return next();
  }catch(error){
    console.log(error);
  }
  
};

plaidController.exchangePublicForAccessToken = async (req, res, next) => {
  const {public_token} = req.body;

  console.log(public_token, '<<===================Public_Token');
  const request = {
    public_token: public_token,
  };
  
  const response = await plaidClient.itemPublicTokenExchange(request);
  const accessToken = response.data.access_token;
  const {id} = res.locals;

  ///Add to Database Here
  userModels.Person.findOneAndUpdate({_id: id}, {accessToken}).exec()
    .then (response => {
      res.locals.userFound = response;
      
      console.log ('User has been found by token verification', response);
      return next();
    }) .catch((err) => {
      console.log('Error in User Controller' + err);
      return next(err);
    });

    
  
};

plaidController.getTransactions = async (req, res, next) => {
  //This should be on the user
  //Get the access_token from the user ID
  const {id} = res.locals;
  const user = await userModels.Person.findOne({_id: id});
  
  const access_token = user.accessToken;
  
  const request = {
    access_token: access_token,
  };
  try{
    const response = await plaidClient.transactionsSync(request);
    res.locals.transactions = response.data;
   
    return next();
  }catch(err){
    console.log(err);
  }
};

plaidController.saveAccessToken = async (req, res, next) => {

};


module.exports = plaidController;