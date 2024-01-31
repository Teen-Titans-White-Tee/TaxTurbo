import React, { useState, useEffect } from 'react';
import {useGetUserDataQuery, useGetTransactionsQuery, usePostDeductionMutation, usePostEarningsMutation} from '../apiSlice.js'; //these are our RTKQueries
//import DashboardComponents:
import ImportedTransactions from '../Components/DashboardComponents/ImportedTransactions.jsx';
import Charts from '../Components/DashboardComponents/Charts.jsx';
import BusinessTransactions from '../Components/DashboardComponents/BusinessTransactions.jsx';
//import @mui Components:
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


const UserDashboardContainer = () => {
  //RTK query GET transactions from plaid api:
  const importedTransactions = useGetTransactionsQuery();
  //RTK query GET userData:
  const userData = useGetUserDataQuery();
  //console.log(userData.data, ' userDashboard userData');
  // Both POST queries into an object to pass to Business Transactions Component:
  const postTransactions = {usePostDeductionMutation, usePostEarningsMutation};
  //Styling for All Dashboard:
  const styles = {
    dashboard: {
      padding: '20px',
      margin: '60px',
      backgroundColor: '#EDE7F6',
    },
    header: {
      fontFamily: 'Poppins, sans-serif',
      color: '#673AB7',
      marginBottom: '20px',
    },
    username: {
      position: 'absolute',
      fontFamily: 'Poppins, sans-serif',
      color: '#673AB7',
      top: '80px',
      right: '95px',
      fontSize: '16px',
    },
    chartContainer: {
      height: '400px',
      backgroundColor: '#E8EAF6',
      margin: '20px 0',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '20px 0',
    },
    button: {
      margin: '5px',
    },
    formContainer: {
      position: 'fixed',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '30px',
      zIndex: 2,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      width: '400px',
      textAlign: 'center',
      color: '#333',
    },
    closeButton: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      cursor: 'pointer',
    },
    listContainer: {
      width: '100%',
      backgroundColor: '#D1C4E9',
      padding: '8px',
      right: '10px',
      bottom: '0px',
      maxHeight: '247.5px',
      overflow: 'auto',
    },
    listTitle: {
      padding: '10px',
      backgroundColor: 'white',
      position: 'sticky',
      top: '1px',
      zIndex: 1,
    },
    listContent: {
      maxHeight: 'calc(100% - 58px)',
      overflowY: 'auto',
      marginTop: '7px',
    },
    projectionsContainer: {
      backgroundColor: '#D1C4E9',
      padding: '20px',
      margin: '60px',
      marginTop: '20px',
    },
    projection: {
      fontFamily: 'Poppins, sans-serif',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      backgroundColor: 'white',
    },
    slider: {
      marginTop: '10px',
      color: '#673AB7',
    },
  };

  //RENDER WELCOME, CHARTS, IMPORTED TRANSACTIONS, BUSINESS TRANSACTIONS:
  return (
    <>
      <h1 style={styles.header}>Prosper Dashboard</h1>
      {/* If userData isSuccess, render Charts and BusinessTransactions Components: */}
      <div>
        {userData.isLoading ? (
          <>Loading...</>
        ) : userData.isSuccess ? (
          <>
            <div style={styles.username}>Welcome, {userData.data.firstName}</div>
            {/* if query is status: success, render Charts and BusinessExpenses components */}
            <Charts userData={userData} styles={styles}/> 
            <BusinessTransactions userData={userData} postTransactions={postTransactions} styles={styles}/>
          </>
        ) : null }
      </div>
      {/* If importedTransactions isSuccess, render ImportedTransactions Components: */}
      <div>
        {importedTransactions.isLoading ? (
          <>Loading...</>
        ) : importedTransactions.isSuccess ? (
          <>
            <div style={styles.username}>Welcome, {importedTransactions.data.firstName}</div>
            {/* if query is status: success, render charts component */}
            <ImportedTransactions importedTransactions={importedTransactions} styles={styles}/> 
          </>
        ) : null }
      </div>
    </>
  );  
}; 

export default UserDashboardContainer;


//MOCK DATE FOR BUILD | REPLACE WITH USER DATA
// const [pieChartData, setPieChartData] = useState([
//   { id: 'State Tax', label: 'State Tax', value: stateTax },
//   { id: 'Federal Tax', label: 'Federal Tax', value: fedTax },
//   { id: 'SSI Tax', label: 'SSI Tax', value: ssiTax },
//   { id: 'Medicare Tax', label: 'Medicare Tax', value: medicareTax },
//   { id: 'Deductions', label: 'Deductions', value: 0 },
//   { id: 'Earnings', label: 'Earnings', value: 0 },
// ]);
const [barChartData, setBarChartData] = useState([
  { month: 'Aug', earnings: 1000, deductions: -500 },
  { month: 'Sep', earnings: 1200, deductions: -600 },
  { month: 'Oct', earnings: 800, deductions: -400 },
  { month: 'Nov', earnings: 1100, deductions: -550 },
  { month: 'Dec', earnings: 900, deductions: -450 },
  { month: 'Jan', earnings: 1300, deductions: -650 },
]);
const [lineChartData, setLineChartData] = useState([
  {
    id: 'Earnings',
    data: [
      { x: 'Aug', y: 1000 },
      { x: 'Sep', y: 1200 },
      { x: 'Oct', y: 800 },
      { x: 'Nov', y: 1100 },
      { x: 'Dec', y: 900 },
      { x: 'Jan', y: 1300 },
    ],
  },
  {
    id: 'Deductions',
    data: [
      { x: 'Aug', y: 500 },
      { x: 'Sep', y: 600 },
      { x: 'Oct', y: 400 },
      { x: 'Nov', y: 550 },
      { x: 'Dec', y: 450 },
      { x: 'Jan', y: 650 },
    ],
  },
]);      
