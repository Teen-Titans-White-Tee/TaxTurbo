const {Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

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

plaidController.exchangePublicForAccessToken = async (req, res, next) => {
  const {public_token} = req.body;
  console.log(public_token, '<<===================Public_Token');
  const request = {
    public_token: public_token,
  };
  try {
    const response = await plaidClient.itemPublicTokenExchange(request);
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    console.log(itemId, accessToken);
    return next();
  } catch (err) {
    console.log(err);
  }
};

plaidController.getTransactions = async (req, res, next) => {
  const request = {
    access_token: 'access-sandbox-8f4db8b7-f066-41a9-a585-c9fb12f3bb9f',
  };
  const response = await plaidClient.transactionsSync(request);
  const data = response.data;
  console.log(data);
};

plaidController.getTransactions();
module.exports = plaidController;