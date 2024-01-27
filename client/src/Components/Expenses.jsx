import React from 'react';
import {useGetExpensesQuery} from '../apiSlice.js';
//import {gotExpenses} from '../userSlice';
const Expenses = (expenseData) => {
  const postDeduction = () => {
    const {
      data: expenseData,
      isLoading,
      isSuccess,
      isError,
      error,
      refetch
    } = useGetExpensesQuery();
    if(isSuccess) {
      //dispatch(gotExpenses(expenseData));
    }
        
         
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
          
  };
       
};