const {Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

const {PLAID_CLIENT, PLAID_SECRET} = process.env;
const public_token = 'f72d5d944cce7cff3796d2b145c0a6';
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT,
      'PLAID-SECRET': PLAID_SECRET
    },
  },
});

const client = new PlaidApi(configuration);
async function getData(){
    
  const response = await client.itemPublicTokenExchange({ public_token });
  const access_token = response.data.access_token;
  const accounts_response = await client.accountsGet({ access_token });
  const accounts = accounts_response.data.accounts;
  console.log(accounts);

}

getData();