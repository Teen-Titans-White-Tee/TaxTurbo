import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Slider,
  Box,
  MenuItem,
} from '@mui/material';

const AccountCreationForm = () => {
  //used to redirect upon success recieved from the response object
  const navigate = useNavigate();
  // STATE
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [filingStatus, setFilingStatus] = useState('');
  const [state, setState] = useState('');
  // const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [estimatedIncome, setEstimatedIncome] = useState(30);
  const [businessExpenses, setBusinessExpenses] = useState(30);
  const [preTaxRetirementContributions, setPreTaxContributions] = useState(30);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      firstName,
      lastName,
      password,
      filingStatus,
      state,
      // industry,
      email,
      estimatedIncome,
      businessExpenses,
      preTaxRetirementContributions,
    };

    console.log ('THIS IS THE FORM DATA FROM SUBMISSION ON SIGN UP', formData);

    // FORM SUBMISSION LOGIC
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Form submission failed');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {

          //store cookie on local storage here? data.locals.token
          localStorage.setItem('token', data.locals.token);

          setTimeout (() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          console.error('Form submission failed:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error during form submission:', error);
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 4, fontFamily: '"Roboto-Black", Helvetica' }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Create An Account
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Please fill out all information as accurately as possible
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          select
          fullWidth
          margin="normal"
          label="Filing Status"
          variant="outlined"
          value={filingStatus}
          onChange={(e) => setFilingStatus(e.target.value)}
        >
          <MenuItem value="single">Single</MenuItem>
          <MenuItem value="married_joint">Married Filing Jointly</MenuItem>
          <MenuItem value="married_separate">
            Married Filing Separately
          </MenuItem>
          <MenuItem value="head_of_household">Head of Household</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          margin="normal"
          label="State"
          variant="outlined"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <MenuItem value="alabama">Alabama</MenuItem>
          <MenuItem value="alaska">Alaska</MenuItem>
          <MenuItem value="arizona">Arizona</MenuItem>
          <MenuItem value="arkansas">Arkansas</MenuItem>
          <MenuItem value="california">California</MenuItem>
          <MenuItem value="colorado">Colorado</MenuItem>
          <MenuItem value="connecticut">Connecticut</MenuItem>
          <MenuItem value="delaware">Delaware</MenuItem>
          <MenuItem value="florida">Florida</MenuItem>
          <MenuItem value="georgia">Georgia</MenuItem>
          <MenuItem value="hawaii">Hawaii</MenuItem>
          <MenuItem value="idaho">Idaho</MenuItem>
          <MenuItem value="illinois">Illinois</MenuItem>
          <MenuItem value="indiana">Indiana</MenuItem>
          <MenuItem value="iowa">Iowa</MenuItem>
          <MenuItem value="kansas">Kansas</MenuItem>
          <MenuItem value="kentucky">Kentucky</MenuItem>
          <MenuItem value="louisiana">Louisiana</MenuItem>
          <MenuItem value="maine">Maine</MenuItem>
          <MenuItem value="maryland">Maryland</MenuItem>
          <MenuItem value="massachusetts">Massachusetts</MenuItem>
          <MenuItem value="michigan">Michigan</MenuItem>
          <MenuItem value="minnesota">Minnesota</MenuItem>
          <MenuItem value="mississippi">Mississippi</MenuItem>
          <MenuItem value="missouri">Missouri</MenuItem>
          <MenuItem value="montana">Montana</MenuItem>
          <MenuItem value="nebraska">Nebraska</MenuItem>
          <MenuItem value="nevada">Nevada</MenuItem>
          <MenuItem value="newhampshire">New Hampshire</MenuItem>
          <MenuItem value="newjersey">New Jersey</MenuItem>
          <MenuItem value="newmexico">New Mexico</MenuItem>
          <MenuItem value="newyork">New York</MenuItem>
          <MenuItem value="northcarolina">North Carolina</MenuItem>
          <MenuItem value="northdakota">North Dakota</MenuItem>
          <MenuItem value="ohio">Ohio</MenuItem>
          <MenuItem value="oklahoma">Oklahoma</MenuItem>
          <MenuItem value="oregon">Oregon</MenuItem>
          <MenuItem value="pennsylvania">Pennsylvania</MenuItem>
          <MenuItem value="rhodeisland">Rhode Island</MenuItem>
          <MenuItem value="southcarolina">South Carolina</MenuItem>
          <MenuItem value="southdakota">South Dakota</MenuItem>
          <MenuItem value="tennessee">Tennessee</MenuItem>
          <MenuItem value="texas">Texas</MenuItem>
          <MenuItem value="utah">Utah</MenuItem>
          <MenuItem value="vermont">Vermont</MenuItem>
          <MenuItem value="virginia">Virginia</MenuItem>
          <MenuItem value="washington">Washington</MenuItem>
          <MenuItem value="westvirginia">West Virginia</MenuItem>
          <MenuItem value="wisconsin">Wisconsin</MenuItem>
          <MenuItem value="wyoming">Wyoming</MenuItem>

        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography gutterBottom>Estimated Income</Typography>
        <Slider
          value={estimatedIncome}
          onChange={(e, newValue) => setEstimatedIncome(newValue)}
          aria-labelledby="estimated-income-slider"
          valueLabelDisplay="auto"
          min={0}
          max={200000}
          step={10000}
          valueLabelFormat={(value) => `$${value.toLocaleString()}`}
        />
        <Typography gutterBottom>Business Expenses</Typography>
        <Slider
          value={businessExpenses}
          onChange={(e, newValue) => setBusinessExpenses(newValue)}
          aria-labelledby="business-expenses-slider"
          valueLabelDisplay="auto"
          min={0}
          max={200000}
          step={10000}
          valueLabelFormat={(value) => `$${value.toLocaleString()}`}
        />
        <Typography gutterBottom>Pre-Tax Retirement Contributions</Typography>
        <Slider
          value={preTaxRetirementContributions}
          onChange={(e, newValue) => setPreTaxContributions(newValue)}
          aria-labelledby="pre-tax-contributions-slider"
          valueLabelDisplay="auto"
          min={0}
          max={200000}
          step={10000}
          valueLabelFormat={(value) => `$${value.toLocaleString()}`}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#000',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
            mt: 3,
            mb: 2,
          }}
          fullWidth
        >
          CREATE ACCOUNT
        </Button>
      </Box>
    </Container>
  );
};

export default AccountCreationForm;
