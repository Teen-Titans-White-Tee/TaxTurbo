import React from 'react';

import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from 'react-plaid-link';

  


export default function Link(){
 
 


  const { open, ready } = usePlaidLink({
    token: '<GENERATED_LINK_TOKEN>',
    onSuccess: (public_token, metadata) => {
      // send public_token to server
    },
  });
  
  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );

}