import React, {useEffect, useState} from 'react';
import { useNormalizedData } from '@nivo/pie';
import {useGetUserDataQuery}  from '../apiSlice';
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
  badgeClasses,
} from '@mui/material';
import { RobotoFontFace } from '@fontsource/roboto';


const ImportedTransactions = ({data, styles}) => {

  const userData = useGetUserDataQuery();
  const user = userData.data;
  console.log(user);
  //results from userDataQuery (called in Dashboard Container):

  const [selected, setSelected] = useState([]);
  const expenseData = [];
  
  // For Each Expense in Expense Data
  // data.includes(expensedateId) add to selected
  const transactionIds = [];
  data.forEach((obj)=>{
    
    if(obj.transaction_id) transactionIds.push(obj.transaction_id); 
    
  });
  console.log('Expense DAta========>',expenseData);
  expenseData.forEach((obj)=>{
    console.log('Expense Data Oject Id=========>',obj.transaction_id);
    if(transactionIds.includes(obj.transaction_id)) {
      setSelected([...selected,obj.transaction_id]);
    }
    console.log('Selected State in For Loop======>',selected);
  });
  
  async function addExpense(transaction){
  
    const {transaction_id, amount, date,name} = transaction;

    console.log(transaction);
    await fetch('http://localhost:3000/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({
        amount:amount,
        date:date,
        transaction_id: transaction_id,
        source:name,
        timestamp:'',
        type:'deduction'
      }),
    })
      .then (response => response.json())
      .then (data => {
        // const stateTax = (Math.abs(data.userTransactionData.stateTax));
        console.log('Successful DB Entry');
      });

  }
  
  return (
    <div>
      <List style={styles.listContainer}>
        <div style={styles.listTitle}>
          <Typography variant="h7">Imported Transactions</Typography>
        </div>
        <div style={styles.listContent}>
          {data.map((transaction, index) => (
          
            <React.Fragment key={index}>
              <ListItem style={styles.listItem} onClick={()=> addExpense(transaction)}>
           
                <div style={{ width: '70%', display: 'inline-block'}} >
                  {transaction.name} {transaction.amount} {transaction.date} {transaction.category}
                  {/* {console.log('Transaction ID==============>',transaction.transaction_id )}
                  {console.log('Selected ID==============>',selected )} , backgroundColor: selected.includes(transaction.transaction_id) ? 'green' : 'red' } */}
                </div>

              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </div>
      </List>
    </div>
  );
};
         
export default ImportedTransactions;

  

          
 

