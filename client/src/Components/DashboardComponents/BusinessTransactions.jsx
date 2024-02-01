import React, { useState, useEffect } from 'react';
//IMPORT mui and nivo:
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { RobotoFontFace } from '@fontsource/roboto';
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

const BusinessTransactions = ({ userData, usePostDeductionMutation, usePostEarningsMutation, styles }) => {
  
  //Earnings state:
  const [grossEarnings, setGrossEarnings] = useState(0); // should this be redux?
  const [earningData, setEarningData] = useState({
    amount: 0,
    source: '',
    timestamp: '',
    type: 'earning',
    medicareTax: 0,
    stateTax: 0,
    ssiTax: 0,
    federalTax: 0,
    
  });
    //Earnings form:
  const [isEarningFormOpen, setIsEarningFormOpen] = useState(false);
  const openEarningForm = () => {
    setIsEarningFormOpen(true);
  }; 
  const closeEarningForm = () => {
    setIsEarningFormOpen(false);
  };
   
  //Deductions form: 
  const [isDeductionFormOpen, setIsDeductionFormOpen] = useState(false);
  const openDeductionForm = () => {
    setIsDeductionFormOpen(true);
  };
  const closeDeductionForm = () => {
    setIsDeductionFormOpen(false);
  };
  const [deductionData, setDeductionData] = useState({
    amount: 0,
    source: '',
    date: '',
    type: 'deduction',
  });

  /* NEED TO REFACTOR:
  /* FUNCTION TO SEND POST REQUEST UPON SUBMIT EARNING -- need to translate to RTKQuery:
const postEarning = async () => {
     const newEarningTransaction = {
            id: transactions.length + 1,
            description: `Earning | ${earning.source}`,
            amount: `+$${earning.amount.toFixed(2)}`,
            medicareTax: `Medicare Tax | ${earning.transMedicare.toFixed(2)}`,
            stateTax: `State Tax | ${earning.transState.toFixed(2)}`,
            ssiTax:  `SSI Tax | ${earning.transSSI.toFixed(2)}`,
            federalTax: `Federal Tax | ${earning.transFed.toFixed(2)}`,
            timestamp: currentTime.toISOString(),
          };

  await usePostEarnings(earning);
      if (isSuccess) {
        const stateTax = (Math.abs(data.userTransactionData.stateTax));
        data.userTransactionData.incomes.forEach((earning) => {
        setTransactions([...transactions, newEarningTransaction]);
      }
      //ITERATE THROUGH THE TRANSACTION ARRAY AND UPDATE THE STATE.
      
};*/
  /*fetch request to POST deduction -- translate to RTK query POST:
  const postDeduction = () => {
    fetch('http://localhost:3000/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deductionData),
    })
      .then(response => response.json())
      .then (data => {
        //DONT THINK THIS IS NEEDED:
        //const stateTax = (Math.abs(data.userTransactionData.stateTax));
       
        // const updatedPieChartData = [
        //   { id: 'State Tax', label: 'State Tax', value: stateTax },
        //   { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(data.userTransactionData.fedTax)).toFixed(2) },
        //   { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(data.userTransactionData.ssiTax)).toFixed(2) },
        //   { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(data.userTransactionData.medicareTax)).toFixed(2) },
        //   { id: 'Deductions', label: 'Deductions', value: (Math.abs(data.userTransactionData.businessExpenses)).toFixed(2) },
        //   { id: 'Earnings', label: 'Earnings', value: (Math.abs(data.userTransactionData.estimatedIncome)).toFixed(2) },
        // ];
            
            
        data.userTransactionData.expenses.forEach((deduction) => {
        //SETTING TRANSACTION DATA
  
          const newDeductionTransaction = {
            id: transactions.length + 1,
            description: `Deduction | ${deduction.source}`,
            amount: `+$${deduction.amount.toFixed(2)}`,
            date: new Date().toLocaleDateString(),
          };
        
          setTransactions([...transactions, newDeductionTransaction]);
        });
        // RESET FORM
        setEarningData({
          amount: 0,
          source: '',
          timestamp: '',
          type:'earning',
        });
        closeEarningForm();
      })
      .catch((error) => {
        console.error('Error while fetching transaction data', error);
      });
  
  };*/
  /* REALLY HANDLE EVERYTHING SUBMIT - EARNINGS

  const handleEarningSubmit = () => {

    //POST REQUEST HERE 
    const currentTime = new Date();
    const currentMonth = currentTime.toLocaleString('default', {
      month: 'short',
    });

    // TURN STRING TO NUM
    const earningAmount = parseFloat(earningData.amount);


    setEarningData({
      ...earningData,
      // timestamp: currentTime.toISOString(),
      amount: earningAmount
    });

    console.log ('Value of earning data from DashBoard Container', earningData);

    
    // UPDATE GROSS
    setGrossEarnings((prevGrossEarnings) => prevGrossEarnings + earningAmount);

    // CREATE & ADD NEW TRANSACTION
    const newEarningTransaction = {
      id: transactions.length + 1,
      description: `Earning | ${earningData.source}`,
      amount: `+$${earningAmount.toFixed(2)}`,
      // timestamp: currentTime.toISOString(),
    };

    setTransactions([...transactions, newEarningTransaction]);



    // UPDATE PIE
    const updatedPieChartData = pieChartData.map((slice) => {
      if (slice.id === 'Earnings') {
        return {
          ...slice,
          value: slice.value + earningAmount,
        };
      }
      return slice;
    });

    setPieChartData(updatedPieChartData);

    // UPDATE BAR BUT MAKE SURE ITS THE CURRENT MONTH
    const updatedBarChartData = barChartData.map((monthData) => {
      if (monthData.month === currentMonth) {
        return {
          ...monthData,
          earnings: monthData.earnings + earningAmount,
        };
      }
      return monthData;
    });

    setBarChartData(updatedBarChartData);

    // SAME FOR LINE
    const updatedLineChartData = lineChartData.map((lineData) => {
      if (lineData.id === 'Earnings') {
        return {
          ...lineData,
          data: [
            ...lineData.data,
            {
              x: currentMonth,
              y: lineData.data[lineData.data.length - 1].y + earningAmount,
            },
          ],
        };
      }
      return lineData;
    });

    setLineChartData(updatedLineChartData);
 */
  /* ANOTHER HANDLE EVERYTHING SUBMIT - DEDUCTIONS
      const handleDeductionSubmit = () => {
        //POST REQUEST HERE 
        const currentTime = new Date();
        const currentMonth = currentTime.toLocaleString('default', {
          month: 'short',
        });
        const deductionAmount = parseFloat(deductionData.amount);
    
        setDeductionData({
          ...deductionData,
          // timestamp: currentTime.toISOString(),
          amount: deductionAmount
        });
    
        // TURN STRING TO NUM
       
    
        // UPDATE GROSS
        setGrossEarnings(
          (prevGrossEarnings) => prevGrossEarnings - deductionAmount
        );
    
        // CREATE & ADD NEW TRANSACTION
        const newDeductionTransaction = {
          id: transactions.length + 1,
          description: `Deduction | ${deductionData.source}`,
          amount: `-$${deductionAmount.toFixed(2)}`,
          // timestamp: currentTime.toISOString(),
        };
    
        setTransactions([...transactions, newDeductionTransaction]);
    
        // UPDATE PIE
        const updatedPieChartData = pieChartData.map((slice) => {
          if (slice.id === 'Deductions') {
            return {
              ...slice,
              value: slice.value + deductionAmount,
            };
          }
          return slice;
        });
    
        setPieChartData(updatedPieChartData);
    
        // UPDATE BAR
        const updatedBarChartData = barChartData.map((monthData) => {
          if (monthData.month === currentMonth) {
            return {
              ...monthData,
              deductions: monthData.deductions - deductionAmount,
            };
          }
          return monthData;
        });
    
        setBarChartData(updatedBarChartData);
    
        // UPDATE LINE
        const updatedLineChartData = lineChartData.map((lineData) => {
          if (lineData.id === 'Deductions') {
            return {
              ...lineData,
              data: [
                ...lineData.data,
                {
                  x: currentMonth,
                  y: lineData.data[lineData.data.length - 1].y + deductionAmount,
                },
              ],
            };
          }
          return lineData;
        });
    
        setLineChartData(updatedLineChartData);
    
        // RESET FORM
        setDeductionData({
          amount: 0,
          source: '',
          timestamp: '',
          type: 'deduction',
        });
        closeDeductionForm();
      };
    
      // RUN ONCE / TRY REDUCE TO ADD ALL PIE SLICES
      useEffect(() => {
        const initialGrossEarnings = pieChartData.reduce(
          (total, slice) => total + slice.value,
          0
        );
        setGrossEarnings(initialGrossEarnings);
      }, []);
    */

  // MOCK DATA FOR DEDUCTIONS:
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Transaction 1', amount: '$100.00' },
    { id: 2, description: 'Transaction 2', amount: '$200.00' },
    { id: 3, description: 'Transaction 3', amount: '$-50.00' },
    { id: 4, description: 'Transaction 4', amount: '$-40.00' },
    { id: 5, description: 'Transaction 5', amount: '$-35.00' },
    { id: 6, description: 'Transaction 6', amount: '$-15.00' },
    { id: 7, description: 'Transaction 7', amount: '$-123.00' },
    { id: 8, description: 'Transaction 8', amount: '$-66.00' },
    { id: 9, description: 'Transaction 9', amount: '$-45.00' },
    { id: 10, description: 'Transaction 10', amount: '$-15.00' },
  ]);  
  
  //RENDER YTD EARNINGS, BUTTONS TO RECORD EARNINGS AND DEDUCTIONS, LIST OF RECORDED DEDUCTIONS:
  return (
    <Paper style={styles.dashboard}>
      
      {/* YTD Gross Earnings: */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div style={styles.chartContainer}>  
            <Typography
              variant="h6"
              style={{
                marginTop: '18px',
                marginLeft: '225px',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
                YTD Gross Earnings = ${grossEarnings}
            </Typography>
          </div>
        </Grid>
      </Grid>
      
      {/* Record Earnings buttons: */}
      <div style={styles.buttonContainer}>
        <Button
          variant="contained"
          style={{
            ...styles.button,
            backgroundColor: 'white',
            color: 'black',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          onClick={openEarningForm}
        >
          Record Earning
        </Button>
        <Button
          variant="contained"
          style={{
            ...styles.button,
            backgroundColor: 'white',
            color: 'black',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          onClick={openDeductionForm}
        >
        Record Deduction
        </Button>
      </div>
      
      {/* List of recorded business transactions: */}
      <List style={styles.listContainer}>
        <div style={styles.listTitle}>
          <Typography variant="h7">Recorded Business Transactions </Typography>
        </div>
        <div style={styles.listContent}>
          {transactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <ListItem style={styles.listItem}>
                <div style={{ width: '70%', display: 'inline-block' }}>
                  {transaction.description} {transaction.amount} {transaction.medicareTax} {transaction.stateTax} {transaction.federalTax} {transaction.ssiTax}
                </div>
                <div
                  style={{
                    width: '50%',
                    display: 'inline-block',
                    textAlign: 'right',
                  }}
                >
                  Date: {transaction.date}
                </div>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </div>
      </List>
    </Paper>
  );
}; 

export default BusinessTransactions;

/*STILL TO INCORPORATE INTO RETURN:
{isEarningFormOpen && (
        <div style={styles.formContainer}>
          <IconButton
            onClick={closeEarningForm}
            style={{ ...styles.closeButton, fontSize: '16px' }}
            color="black"
          >
            X
          </IconButton>
          <h3>Record Earning</h3>
          <form onSubmit={(e) => { handleEarningSubmit(); postEarning(e); }}>
            <div>
              <label htmlFor="amount">Amount: $</label>
              <input
                type="number"
                id="amount"
                value={earningData.amount}
                onChange={(e) =>
                  setEarningData({ ...earningData, amount: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="source">Source (descr.): </label>
              <input
                type="text"
                id="source"
                value={earningData.source}
                onChange={(e) =>
                  setEarningData({ ...earningData, source: e.target.value })
                }
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {isDeductionFormOpen && (
        <div style={styles.formContainer}>
          <IconButton
            onClick={closeDeductionForm}
            style={{ ...styles.closeButton, fontSize: '16px' }}
            color="black"
          >
            X
          </IconButton>
          <h3>Record Deduction</h3>
          <form onSubmit={(e) => { handleDeductionSubmit(); postDeduction(e); }}>
            <div>
              <label htmlFor="deductionAmount">Amount: $</label>
              <input
                type="number"
                id="deductionAmount"
                value={deductionData.amount}
                onChange={(e) =>
                  setDeductionData({ ...deductionData, amount: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="deductionSource">Source (descr.): </label>
              <input
                type="text"
                id="deductionSource"
                value={deductionData.source}
                onChange={(e) =>
                  setDeductionData({ ...deductionData, source: e.target.value })
                }
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <Paper style={styles.projectionsContainer}>
        <h2 style={styles.header}>Projections</h2>
        {Object.keys(sliderValues).map((id) => renderSlider(id))}
      </Paper>
    </div>
  );
};
*/