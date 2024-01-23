const tables = require('../models/pgModels.js');

const data = {};

data.stateBrackets = (req, res, next) =>{
  console.log ('State Brackets Middleware accessed');
  let { state, filingStatus } = res.locals;
  if (filingStatus === 'head') filingStatus = 'single';

  console.log ('Value of state in StateBrackets', state);
  console.log ('Vale of filingStatus in StateBrackets',filingStatus);
  const query = {
    text: `
        SELECT *
        FROM tax_rates
        WHERE state_name = $1
          AND filing_status = $2`,
    values: [state, filingStatus],
  };
  console.log ('res.locals.tables destructured and query created.');

  tables.query(query)
    .then((data) =>{
      res.locals.stateTables = data.rows;
      console.log('tables fetched ', data.rows);
      return next();
    })
    .catch((err) => {
      console.log('Error in DataRetrieval controller!' + err);
      return next(err);
    });

};

data.fedBrackets = ( req, res, next) => {
  const { filingStatus } = res.locals;

  const query = {
    text: `
        SELECT *
        FROM federal_tax_rates
        WHERE filing_status = $1`,
    values: [filingStatus],
  };

  tables.query(query)
    .then((data) => {
      res.locals.fedTables = data.rows;
      console.log('federal tables fetched ', data.rows);
      return next();
    })
    .catch((err) =>{
      console.log('Error in the dta.fedBrackets middleware', err);
      return next(err);
    });

};

module.exports = data;
