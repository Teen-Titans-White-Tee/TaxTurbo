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

const ImportedTransactions = ({data, styles}) => {
//results from userDataQuery (called in Dashboard Container):
   
  return (
    <div>
      <List style={styles.listContainer}>
        <div style={styles.listTitle}>
          <Typography variant="h7">Imported Transactions</Typography>
        </div>
        <div style={styles.listContent}>
          {data.added.map((transaction, index) => (
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
    </div>
  );
};
         
export default ImportedTransactions;

  

          
 

