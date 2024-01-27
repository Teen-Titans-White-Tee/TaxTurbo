const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const apiRouterUser = require('./routes/userRouter');
// const dashboardRouter = require ('./routes/dashboardRouter');
const transactionRouter = require ('./routes/transactionRouter');
// const signupRouter = require('./routes/signupRouter');
const authRouter = require('./routes/authRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));s
app.use(cookieParser());
app.use(cors());

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// app.get('/', (req, res) => {
  
//   res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
// });

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