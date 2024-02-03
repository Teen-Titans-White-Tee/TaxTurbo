require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const transactionRouter = require ('./routes/transactionRouter.js');
const authRouter = require('./Routes/authRouter');
const apiRouter = require('./routes/apiRouter');
const dataRouter = require('./routes/dataRouter');

console.log('starting server');

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

//jsdocs route
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// serve user data

app.use('/auth', authRouter);

app.use('/data', dataRouter);

app.use('/api',apiRouter, (req, res)=>{
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

//Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;