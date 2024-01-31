import React, { useCallback, useState, useEffect } from 'react';

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from 'react-plaid-link';
  


export default function Link(){
  const [token, setToken] = useState('');

  useEffect(() => {

    const createLinkToken = async () => {
      const response = await fetch('/api/plaid/generate_link_token', {
        method: 'POST',
      });
     
      const { token } = await response.json();
      console.log(token);
      setToken(token);
      
    };
    createLinkToken().then();
  }, []);
  
  
  
 

  const { open, ready } = usePlaidLink({
    token,
    onSuccess: (public_token, metadata) => {
      // send public_token to server
    },
  });
  
  return (
    <>
    
      <button onClick={() => open()} disabled={!ready}>
      Connect a bank account 
      </button>
    </>
  );

}