const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const apiRouter = require ('./routes/apiRouter');
const userRouter = require('./routes/userRouter');
const dashboardRouter = require ('./routes/dashboardRouter');
const transactionRouter = require ('./routes/transactionRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// app.get('/', (req, res) => {
  
//   res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
// });


app.use('/auth', (req, res)=>{
  res.send('Auth Path hit');
});

app.use('/api', apiRouter);

app.use('/dashboard', dashboardRouter);

app.use('/signup', userRouter);

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