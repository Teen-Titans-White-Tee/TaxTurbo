require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const signupRouter = require('./Routes/signupRouter');
// const dashboardRouter = require ('./Routes/dashboardRoute');
const transactionRouter = require ('./Routes/transactions');
const authRouter = require('./Routes/authRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080',
}));


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// app.get('/', (req, res) => {
  
//   res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
// });

// auth/login - DONE
// auth/signup - move signupRouter in - front end reroutes to login upon success
// auth/verify - protected routes e.g. dashboard. FE protected route will check if user is authenticated. FE auth component that post request to auth/verify. If FE auth component truthy, allow access to protected routes.


// app.use('/dashboard', dashboardRouter);

app.use('/auth', authRouter);

app.use('/api', (req, res)=>{
  res.send('Api Path hit');
});


// app.use('/signup', signupRouter);

app.use('/transaction', transactionRouter);


// app.get('/', (req, res) => {
  
//   res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
// });

//Catch-all route for client-side routing
app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;