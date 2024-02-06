import React, { useCallback, useState, useEffect } from 'react';
import {
  Paper,
  Button,
  List,
  ListItem,
  Divider,
  Slider,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from 'react-plaid-link';
  
const styles = {
  
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  button: {
    margin: '5px',
  },
};

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
    createLinkToken();
  }, []);
  
  
  
 

  const { open, ready } = usePlaidLink({
    token,
    onSuccess: async (public_token, metadata) => {
      // send public_token to server
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({public_token})
      };
      try{
        const response = await fetch('/api/plaid/exchange_token', options);
        console.log(response);
      }catch(err){
        console.log(err);
      }
    },
  });
  
  return (
    <>
    
      <Button 
        variant="contained"
        style={{
          ...styles.button,
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        }}
        onClick={() => open()} disabled={!ready}>
      Connect a bank account 
      </Button>
    </>
    
  );

}