import React, { useState, useEffect } from 'react';
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

const Charts = ({userData, styles}) => {
  //destructured results from query (queried from Dashboard container)
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = userData;

  console.log(data, 'data from userData');
  
  //pulls all of our chartData from query response:
  const chartData = [
    { id: 'State Tax', label: 'State Tax', value: data.stateTax },
    { id: 'Federal Tax', label: 'Federal Tax', value: (Math.abs(data.fedTax)) },
    { id: 'SSI Tax', label: 'SSI Tax', value: (Math.abs(data.ssiTax)) },
    { id: 'Medicare Tax', label: 'Medicare Tax', value: (Math.abs(data.medicareTax)) },
    { id: 'Deductions', label: 'Deductions', value: (Math.abs(data.businessExpenses))},
    { id: 'Earnings', label: 'Earnings', value: (Math.abs(data.estimatedIncome))},
  ];
  console.log('chartData:', chartData);
  
  //Bar or Line Chart?
  const [isBarChart, setIsBarChart] = useState(true);
  const toggleChartType = () => {
    setIsBarChart(!isBarChart);
  };
  
  /*//SLIDERS (NOT CURRENTLY RENDERING):
  //Sliders:
  const [sliderValues, setSliderValues] = useState({ 1: 0, 2: 0 });
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
  );*/

  //RENDER CHARTS:
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
                <Grid item xs={12} md={6}>
                  <div style={styles.chartContainer}>
                    {isBarChart ? (
                      <ResponsiveBar
                        data={chartData}
                        keys={['earnings', 'deductions']}
                        indexBy="month"
                        margin={{ top: 50, right: 40, bottom: 100, left: 40 }}
                        padding={0.3}
                      />
                    ) : (
                      <ResponsiveLine
                        data={chartData}
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
                </Grid>
                <Grid item xs={12} md={6}>
                  <div style={styles.chartContainer}>
                    <ResponsivePie
                      data={chartData}
                      margin={{ top: 40, right: 0, bottom: 100, left: 40 }}
                      innerRadius={0.5}
                      padAngle={2}
                      activeOuterRadiusOffset={8}
                      colors={{ scheme: 'set3' }}
                    />
                    {/* Cut YTD earnings from here and put in Earnings Component */}
                  </div>
                </Grid>
              </Grid>
              {/* Cut Record Earnings and Deduction from here and put in BusinessTransactions Component */}
            </Paper>
          </div>
        </>
      ) : null
      }
    </div>
  );
};
export default Charts;