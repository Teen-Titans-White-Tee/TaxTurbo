import React from 'react';
import { useNormalizedData } from '@nivo/pie';
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
const ImportedTransactions = ({transactions, styles}) => {
//results from userDataQuery (called in Dashboard Container):
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = transactions;
    
  return (
    <div>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <List style={styles.listContainer}>
          <div style={styles.listTitle}>
            <Typography variant="h7">Imported Transactions</Typography>
          </div>
          <div style={styles.listContent}>
            {data.map((transaction, index) => (
              <React.Fragment key={index}>
                <ListItem style={styles.listItem}>
                  <div style={{ width: '70%', display: 'inline-block' }}>
                    {transaction.name} {transaction.amount} {transaction.date} {transaction.category}
                  </div>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </div>
        </List>
      ) : null}
    </div>
  );
};
         
export default ImportedTransactions;

  

          
 