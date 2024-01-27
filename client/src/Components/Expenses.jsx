import React from 'react';
import {useGetExpensesQuery} from '../apiSlice.js';

const Expenses = ({expenses}) => {
  const {
      expenseData,
      isLoading,
      isSuccess,
      isError,
      error,
      refetch
    } = useGetExpensesQuery();
    return (
    <div>
        {isError ? (
            <>Oh no, there was an error</>
        ) : isLoading ? (
            <>Loading...</>
        ) : userData ? (
            <>
            <h3>imported Expenses</h3>
                <list expenses/>
            </>
            ) : null}
    </div>
  )  
};   
<List style={styles.listContainer}>
//           <div style={styles.listTitle}>
//             <Typography variant="h7">Previous Transactions</Typography>
//           </div>
//           <div style={styles.listContent}>
//             {transactions.map((transaction) => (
//               <React.Fragment key={transaction.id}>
//                 <ListItem style={styles.listItem}>
//                   <div style={{ width: '70%', display: 'inline-block' }}>
//                     {transaction.description} {transaction.amount} {transaction.medicareTax} {transaction.stateTax} {transaction.federalTax} {transaction.ssiTax}
//                   </div>
//                   <div
//                     style={{
//                       width: '50%',
//                       display: 'inline-block',
//                       textAlign: 'right',
//                     }}
//                   >
//                     Timestamp: {transaction.timestamp}
//                   </div>
//                 </ListItem>
//                 <Divider />
//               </React.Fragment>
//             ))}
//           </div>
//         </List>
//       </Paper>     
         
    // data.userTransactionData.expenses.forEach((deduction) => {
    //   //SETTING TRANSACTION DATA
  
    //   const newExpenseTransaction = {
    //     id: transactions.length + 1,
    //     description: `Deduction | ${deduction.source}`,
    //     amount: `+$${deduction.amount.toFixed(2)}`,
    //     // timestamp: currentTime.toISOString(),
    //   };
        
    //   setTransactions([...transactions, newExpenseTransaction]);
  
  
//     });
          
 