const {Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

const {PLAID_CLIENT, PLAID_SECRET, PUBLIC_TOKEN,PLAID_ENV } = process.env;

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
 
  const CURR_USER_ID =  '1';
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






module.exports = plaidController;