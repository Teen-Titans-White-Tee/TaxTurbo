import React, { useState, useEffect } from 'react';
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
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { RobotoFontFace } from '@fontsource/roboto';

//STATE STATE STATE STATE
const DashboardPage = () => {

  const [userData, setUserData] = useState(null);

  // FETCHING DATA
  const fetchData = () => {
    const token = localStorage.getItem('token');
    console.log ('token data retrieved using localstorage.getItem', token);
    // GET REQUEST TO RETRIEVE USER DATA
    fetch ('http://localhost:3000/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      //credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        console.log('response from GET request to /dashboard in dashboard', data);

        const username = data.userFound.email;
        const stateTax = (Math.abs(data.userFound.stateTax));
        setUsername(username);

  
        const updatedPieChartData = [
          { id: 'State Tax', label: 'State Tax', value: stateTax },
          { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(data.userFound.fedTax)) },
          { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(data.userFound.ssiTax)) },
          { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(data.userFound.medicareTax)) },
          { id: 'Deductions', label: 'Deductions', value: (Math.abs(data.userFound.businessExpenses))},
          { id: 'Earnings', label: 'Earnings', value: (Math.abs(data.userFound.estimatedIncome))},
        ];
        
        setPieChartData(updatedPieChartData);
  
  
        if (data.userFound) {
          setGrossEarnings(data.userFound.estimatedIncome);
        }
      })
      .catch(err => console.log(err));
  };
  /*On load we will make a GET request to retrieve user data based on the verification of token  */
  useEffect(() => {
    fetchData();

  }, []);

  const [sliderValues, setSliderValues] = useState({ 1: 0, 2: 0 });
  const [grossEarnings, setGrossEarnings] = useState(0);
  const [username, setUsername] = useState();
  const [isBarChart, setIsBarChart] = useState(true);
  const [isEarningFormOpen, setIsEarningFormOpen] = useState(false);
  const [isDeductionFormOpen, setIsDeductionFormOpen] = useState(false);
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
  const [deductionData, setDeductionData] = useState({
    amount: 0,
    source: '',
    timestamp: '',
    type: 'deduction',
  });

  //HELPER FUNCTIONS FOR CHARTS / FORMS - TRUE / FALSE

  const toggleChartType = () => {
    setIsBarChart(!isBarChart);
  };

  const openEarningForm = () => {
    setIsEarningFormOpen(true);
  };

  const openDeductionForm = () => {
    setIsDeductionFormOpen(true);
  };

  const closeEarningForm = () => {
    setIsEarningFormOpen(false);
  };

  const closeDeductionForm = () => {
    setIsDeductionFormOpen(false);
  };

  /* FUNCTION TO SEND POST REQUEST UPON SUBMIT EARNING*/

  const postEarning = () => {
    const token = localStorage.getItem('token');

    setTimeout(()=> {

      fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(earningData),
      })
        .then (response => response.json())
        .then (data => {
          const stateTax = (Math.abs(data.userTransactionData.stateTax));
          //DO SOMETHING WITH DATA FROM THE TRANSACTION
          //UPDATE STATE OF THE CHART 

          const updatedPieChartData = [
            { id: 'State Tax', label: 'State Tax', value: stateTax },
            { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(data.userTransactionData.fedTax)).toFixed(2) },
            { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(data.userTransactionData.ssiTax)).toFixed(2) },
            { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(data.userTransactionData.medicareTax)).toFixed(2) },
            { id: 'Deductions', label: 'Deductions', value: (Math.abs(data.userTransactionData.businessExpenses)).toFixed(2) },
            { id: 'Earnings', label: 'Earnings', value: (Math.abs(data.userTransactionData.estimatedIncome)).toFixed(2) },
          ];
          
          setPieChartData(updatedPieChartData);
          console.log ('Result of transaction coming from Dashboard Container', data);

          //ITERATE THROUGH THE TRANSACTION ARRAY AND UPDATE THE STATE.
          data.userTransactionData.incomes.forEach((earning) => {
            //SETTING TRANSACTION DATA

            const newEarningTransaction = {
              id: transactions.length + 1,
              description: `Earning | ${earning.source}`,
              amount: `+$${earning.amount.toFixed(2)}`,
              medicareTax: `Medicare Tax | ${earning.transMedicare.toFixed(2)}`,
              stateTax: `State Tax | ${earning.transState.toFixed(2)}`,
              ssiTax:  `SSI Tax | ${earning.transSSI.toFixed(2)}`,
              federalTax: `Federal Tax | ${earning.transFed.toFixed(2)}`,
          
              // timestamp: currentTime.toISOString(),
            };
      
            setTransactions([...transactions, newEarningTransaction]);


          });


        })
        .catch((error) => {
          console.error('Error while fetching transaction data', error);
        });

    }, 0);

  };

  //CHECKING DATA TYPE OF EARNING DATA
  console.log ('CHECKING DATA TYPE OF EARNING DATA', typeof earningData.amount);
  console.log ('CHECKING DATA TYPE OF ded DATA', typeof deductionData.amount);


  // REALLY HANDLE EVERYTHING SUBMIT - EARNINGS

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

    // RESET FORM
    setEarningData({
      amount: 0,
      source: '',
      timestamp: '',
      type:'earning',
    });
    closeEarningForm();
  };


  const postDeduction = () => {
    const token = localStorage.getItem('token');

    setTimeout (() => {

      fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(deductionData),
      })
        .then (response => response.json())
        .then (data => {
          const stateTax = (Math.abs(data.userTransactionData.stateTax));
          //DO SOMETHING WITH DATA FROM THE TRANSACTION
          //UPDATE STATE OF THE CHART 

          const updatedPieChartData = [
            { id: 'State Tax', label: 'State Tax', value: stateTax },
            { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(data.userTransactionData.fedTax)).toFixed(2) },
            { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(data.userTransactionData.ssiTax)).toFixed(2) },
            { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(data.userTransactionData.medicareTax)).toFixed(2) },
            { id: 'Deductions', label: 'Deductions', value: (Math.abs(data.userTransactionData.businessExpenses)).toFixed(2) },
            { id: 'Earnings', label: 'Earnings', value: (Math.abs(data.userTransactionData.estimatedIncome)).toFixed(2) },
          ];
          
          setPieChartData(updatedPieChartData);
          console.log ('Result of transaction coming from Dashboard Container', data);

          data.userTransactionData.expenses.forEach((deduction) => {
            //SETTING TRANSACTION DATA

            const newExpenseTransaction = {
              id: transactions.length + 1,
              description: `Deduction | ${deduction.source}`,
              amount: `+$${deduction.amount.toFixed(2)}`,
              // timestamp: currentTime.toISOString(),
            };
      
            setTransactions([...transactions, newExpenseTransaction]);


          });
        
        })
        .catch((error) => {
          console.error('Error while fetching transaction data', error);
        });

    }, 0);

  };

  // ANOTHER HANDLE EVERYTHING SUBMIT - DEDUCTIONS
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

  //MOCK DATE FOR BUILD | REPLACE WITH USER DATA

  const [transactions, setTransactions] = useState([
    // { id: 1, description: 'Transaction 1', amount: '$100.00' },
    // { id: 2, description: 'Transaction 2', amount: '$200.00' },
    // { id: 3, description: 'Transaction 3', amount: '$-50.00' },
    // { id: 4, description: 'Transaction 4', amount: '$-40.00' },
    // { id: 5, description: 'Transaction 5', amount: '$-35.00' },
    // { id: 6, description: 'Transaction 6', amount: '$-15.00' },
    // { id: 7, description: 'Transaction 7', amount: '$-123.00' },
    // { id: 8, description: 'Transaction 8', amount: '$-66.00' },
    // { id: 9, description: 'Transaction 9', amount: '$-45.00' },
    // { id: 10, description: 'Transaction 10', amount: '$-15.00' },
  ]);

  const [pieChartData, setPieChartData] = useState([
    // { id: 'State Tax', label: 'State Tax', value: stateTax },
    // { id: 'Federal Tax', label: 'Federal Tax', value: fedTax },
    // { id: 'SSI Tax', label: 'SSI Tax', value: ssiTax },
    // { id: 'Medicare Tax', label: 'Medicare Tax', value: medicareTax },
    // { id: 'Deductions', label: 'Deductions', value: 0 },
    // { id: 'Earnings', label: 'Earnings', value: 0 },
  ]);

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

  //SLIDER STUFF

  const handleSliderChange = (id, newValue) => {
    setSliderValues({ ...sliderValues, [id]: newValue });
  };

  const renderSlider = (id) => (
    <div key={id} style={styles.projection}>
      <Typography gutterBottom>
        {id === '1' ? 'Earning Projection' : 'Deduction Projection'}
      </Typography>
      <Slider
        style={styles.slider}
        value={sliderValues[id]}
        onChange={(event, newValue) => handleSliderChange(id, newValue)}
        aria-labelledby={`slider-${id}`}
        min={0}
        max={100000}
        step={100}
      />
      <Typography variant="body2">{`$${sliderValues[id]}`}</Typography>
    </div>
  );

  //STYLING FOR COMPONENTS

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

  // :)
  return (
    <div>
      <Paper style={styles.dashboard}>
        <h1 style={styles.header}>Prosper Dashboard</h1>
        <div>
          <div style={styles.username}>Welcome, {username}</div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div style={styles.chartContainer}>
              {isBarChart ? (
                <ResponsiveBar
                  data={barChartData}
                  keys={['earnings', 'deductions']}
                  indexBy="month"
                  margin={{ top: 50, right: 40, bottom: 100, left: 40 }}
                  padding={0.3}
                />
              ) : (
                <ResponsiveLine
                  data={lineChartData}
                  margin={{ top: 50, right: 40, bottom: 100, left: 40 }}
                />
              )}
            </div>
            <div style={styles.buttonContainer}>
              <IconButton
                onClick={toggleChartType}
                style={styles.buttonIcon}
                color="white"
              >
                <SwapHorizIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={styles.chartContainer}>
              <ResponsivePie
                data={pieChartData}
                margin={{ top: 40, right: 0, bottom: 100, left: 40 }}
                innerRadius={0.5}
                padAngle={2}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'set3' }}
              />
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
        <List style={styles.listContainer}>
          <div style={styles.listTitle}>
            <Typography variant="h7">Previous Transactions</Typography>
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
                    Timestamp: {transaction.timestamp}
                  </div>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </div>
        </List>
      </Paper>
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

export default DashboardPage;