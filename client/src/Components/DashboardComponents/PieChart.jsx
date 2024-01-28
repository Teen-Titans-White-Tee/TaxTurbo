import React from 'react';
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

const PieChart = ({userData, styles}) => {
  //destructured results from query (queried from Dashboard container)
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = userData;
  
  const pieChartData = [
    { id: 'State Tax', label: 'State Tax', value: data.taxesOwed.stateTax },
    { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(data.taxesOwed.fed)) },
    { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(data.taxesOwed.ssi)) },
    { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(data.taxesOwed.medicare)) },
    { id: 'Deductions', label: 'Deductions', value: (Math.abs(data.businessExpenses))},
    { id: 'Earnings', label: 'Earnings', value: (Math.abs(data.estimatedIncome))},
  ];
  console.log('data in PieChart:', data);
  
  return (
    <div>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : userData ? (
        <>
          <h3>{userData.firstName}</h3>
          <div>
            <Paper style={styles.dashboard}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12} md={6}>
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
                 <SwapHorizIcon/>
               </IconButton>
             </div>
           </Grid> */}
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
                    {/* <Typography
                 variant="h6"
                 style={{
                   marginTop: '18px',
                   marginLeft: '225px',
                   fontFamily: 'Roboto, sans-serif',
                 }}
               >
                 YTD Gross Earnings = ${grossEarnings}
               </Typography> */}
                  </div>
                </Grid>
              </Grid>
              {/* <div style={styles.buttonContainer}>
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
            </div>*/}
              {/* <List style={styles.listContainer}>
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
        </List> */}
            </Paper>
          </div>
        </>
      ) : null
      }
    </div>
  );
};
export default PieChart;