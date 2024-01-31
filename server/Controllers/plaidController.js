const {Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

const {PLAID_CLIENT, PLAID_SECRET, PUBLIC_TOKEN, } = process.env;

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments['sandbox'],
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
  const CURR_USER_ID =  1;
  const linkTokenConfig = {
    user: { client_user_id: CURR_USER_ID },
    client_name: 'Plaid Tutorial',
    language: 'en',
    products: ['auth'],
    country_codes: ['US'],
    webhook: 'https://www.example.com/webhook',
  };
  const tokenResponse = await plaidClient.linkTokenCreate(linkTokenConfig);
  console.log('Token REsponse=========================>>>>>>',tokenResponse);
  const tokenData = tokenResponse.data;
  
  return res.json(tokenData);
};


plaidController.generateLinkToken({body:{id:1}});



module.exports = plaidController;