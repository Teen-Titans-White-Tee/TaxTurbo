import React from 'react';
import {useGetExpensesQuery} from '../apiSlice.js';

const Expenses = (expenseData) => {
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
          
 