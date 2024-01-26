const {Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

const {PLAID_CLIENT, PLAID_SECRET, PUBLIC_TOKEN} = process.env;

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

console.log(client);

