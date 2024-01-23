
const calc = {};

calc.stateYTDCalc = (req, res, next) => {

  const YTD = res.locals.estimatedIncome - (res.locals.businessExpenses + res.locals.preTaxRetirementContributions); 
  const bracketLow = [];
  res.locals.stateTables.forEach((ele) => {bracketLow.push(ele['income_range_low']);});
  const bracketHigh = [];
  res.locals.stateTables.forEach((ele) => {bracketHigh.push(ele['income_range_high']);});
  const rates = [];
  res.locals.stateTables.forEach((ele) =>{rates.push(ele['tax_rate']);});
  let taxesOwed = 0;

  // 
  if (bracketHigh[0] === 999999999){
    taxesOwed = YTD * rates[0];
  } else {
    for (let i = 0; i < bracketLow.length; i++){
      const min = bracketLow[i];
      const max = bracketHigh[i];
      const currentRate = rates[i];

      if (max === 999999999){
        taxesOwed += ((YTD - min) * currentRate);
      } else if (YTD <= max){
        taxesOwed += ((YTD - min) * currentRate);
        break;
      } else {
        taxesOwed += ((max - min) * currentRate);
      }
    }
  }

  res.locals.taxesOwed.state = taxesOwed;
  return next();
};

calc.fedYTDCalc = (req, res, next) => {
  const YTD = res.locals.estimatedIncome - (res.locals.businessExpenses + res.locals.preTaxRetirementContributions); // <-- property needs to be added
  const bracketLow = [];
  res.locals.stateTables.forEach((ele) => {bracketLow.push(ele['income_range_low']);});
  const bracketHigh = [];
  res.locals.stateTables.forEach((ele) => {bracketHigh.push(ele['income_range_high']);});
  const rates = [];
  res.locals.stateTables.forEach((ele) =>{rates.push(ele['tax_rate']);});
  let taxesOwed = 0;

  for (let i = 0; i < bracketLow.length; i++){

    const min = bracketLow[i];
    const max = bracketHigh[i];
    const currentRate = rates[i];
    if (max === 999999999){
      taxesOwed += ((YTD - min) * currentRate);
    } else if (YTD <= max){
      taxesOwed += ((YTD - min) * currentRate);
      break;
    } else {
      taxesOwed += ((max - min) * currentRate);
    }
  }
  res.locals.taxesOwed.fed = taxesOwed;

  
  return next();
};

calc.SSYTDCalc = (req, res, next) => {
  const YTD = res.locals.estimatedIncome - (res.locals.businessExpenses + res.locals.preTaxRetirementContributions); // <-- property needs to be added
  let taxesOwed = 0;

  if (YTD < 400) {
    taxesOwed = 0;
  } else if (YTD > 160200){
    taxesOwed = 160200 * 0.124;
  } else {
    taxesOwed = YTD * 0.124;
  }

  res.locals.taxesOwed.SSI = taxesOwed;
  return next();
};

calc.medicareYTDCalc = (req , res, next) => {
  const YTD = res.locals.estimatedIncome - (res.locals.businessExpenses + res.locals.preTaxRetirementContributions); // <-- property needs to be added
  let taxesOwed = 0;
  taxesOwed = YTD < 400 ? 0 : YTD * 0.029;

  res.locals.taxesOwed.medicare = taxesOwed;
  return next();
};

calc.allTaxes = (req, res, next) => {
  
  const YTD = res.locals.estimatedIncome - (res.locals.businessExpenses + res.locals.preTaxRetirementContributions);
  
  const stateBracketLow = [];
  const stateBracketHigh = [];
  const stateRates = [];
  res.locals.stateTables.forEach((ele) => {
    stateBracketLow.push(parseInt(ele['income_range_low']));
    stateBracketHigh.push(parseInt(ele['income_range_high']));
    stateRates.push(parseFloat(ele['tax_rate']));
  });

  console.log ('Result from pushing to the arrays', stateBracketLow , stateBracketHigh, stateRates);
  let stateTaxesOwed = 0;


  const fedBracketLow = [];
  const fedBracketHigh = [];
  const fedRates = [];
  res.locals.fedTables.forEach((ele) => {
    fedBracketLow.push(parseInt(ele['income_range_low']));
    fedBracketHigh.push(parseInt(ele['income_range_high']));
    fedRates.push(parseFloat(ele['tax_rate']));
  });

  console.log ('Result from pushing to the fed arrays', fedBracketLow , fedBracketHigh, fedRates);
  let fedTaxesOwed = 0;
  let SSITaxesOwed = 0;
  let MedicareTaxesOwed = 0;

  //initializing res.locals.taxesOwed

  res.locals.taxesOwed = res.locals.taxesOwed || {};

  // Calculating state tax liability
  if (stateBracketHigh[0] === 999999999){
    stateTaxesOwed = YTD * stateRates[0];
  } else {
    for (let i = 0; i < stateBracketLow.length; i++){
      const min = stateBracketLow[i];
      const max = stateBracketHigh[i];
      const currentRate = stateRates[i];

      if (max === 999999999){
        stateTaxesOwed += ((YTD - min) * currentRate);
      } else if (YTD <= max){
        stateTaxesOwed += ((YTD - min) * currentRate);
        break;
      } else {
        stateTaxesOwed += ((max - min) * currentRate);
      }
    }
  }

  // calculating federal tax liability 
  for (let i = 0; i < fedBracketLow.length; i++){

    const min = fedBracketLow[i];
    const max = fedBracketHigh[i];
    const currentRate = fedRates[i];

    if (max === 999999999){
      fedTaxesOwed += ((YTD - min) * currentRate);
    } else if (YTD <= max){
      fedTaxesOwed += ((YTD - min) * currentRate);
      break;
    } else {
      fedTaxesOwed += ((max - min) * currentRate);
    }
  }

  // calculating self employment tax: Social Security Insurance
  if (YTD < 400) {
    SSITaxesOwed = 0;
  } else if (YTD > 160200){
    SSITaxesOwed = 160200 * 0.124;
  } else {
    SSITaxesOwed = YTD * 0.124;
  }
  // calculating self employment tax: Medicare
  MedicareTaxesOwed = YTD < 400 ? 0 : YTD * 0.029;

  console.log (`Final result of all the calculations, Medicare Taxes Owed: ${MedicareTaxesOwed}, SSITaxesOwed: ${SSITaxesOwed}, FedTaxesOwed: ${fedTaxesOwed}, StateTaxesOwed: ${stateTaxesOwed}` );

  res.locals.taxesOwed = {
    ...res.locals.taxesOwed,
    medicare: MedicareTaxesOwed,
    ssi: SSITaxesOwed,
    fed: fedTaxesOwed,
    stateTax: stateTaxesOwed
  };
  return next();
}; 

calc.storage = (req, res, next) => {
  const {estimatedIncome,
    businessExpenses,
    preTaxRetirementContributions,
    medicareTax,
    ssiTax,
    fedTax,
    stateTax} = res.locals.userFound;

  // estimatedIncome = parseInt (estimatedIncome),
  // businessExpenses = parseInt(businessExpenses),
  // preTaxRetirementContributions = parseInt(preTaxRetirementContributions),
  // medicareTax = parseInt(medicareTax);
  // ssiTax = parseInt (ssiTax),
  // fedTax = parseInt (fedTax),
  // stateTax = parseInt (stateTax);

  res.locals.storage = {};
  res.locals.storage = {
    estimatedIncome,
    businessExpenses,
    preTaxRetirementContributions,
    medicareTax,
    ssiTax,
    fedTax,
    stateTax
  };

  return next();
};

calc.newNumbers = (req, res, next) => {

  const amount = parseInt(req.body.amount);

  console.log ('COMING FROM THE NEW NUMBERS MIDDLEWARE, VALUE OF AMOUNT COMING FROM THE TRANSACTION', typeof amount);

  if (req.body.type === 'earning'){
    res.locals.estimatedIncome = res.locals.userFound.estimatedIncome + amount;
    res.locals.businessExpenses = res.locals.userFound.businessExpenses;
  } else {
    res.locals.estimatedIncome = res.locals.userFound.estimatedIncome;
    res.locals.businessExpenses = res.locals.userFound.businessExpenses + amount;
  }
  res.locals.preTaxRetirementContributions = res.locals.userFound.preTaxRetirementContributions;

  res.locals.state = res.locals.userFound.state;
  res.locals.filingStatus = res.locals.userFound.filingStatus;

  console.log ('DATA TYPE OF THE ESTIMATED INCOME', typeof res.locals.estimatedIncome);

  console.log ('Coming from newnumbers middleware, result of adding the income plus earning', res.locals.estimatedIncome);

  return next();
};

calc.transactionOwed = (req , res, next) => {
  const { medicare, ssi, fed, stateTax } = res.locals.taxesOwed;
  const { medicareTax, ssiTax, fedTax} = res.locals.storage;
  const stateOld = res.locals.storage.stateTax;

  res.locals.transactionOwed = {};

  res.locals.transactionOwed = {
    transMedicare: medicare - medicareTax,
    transSSI: ssi - ssiTax,
    transFed: fed - fedTax,
    transState: stateTax - stateOld
  };

  return next();
};

module.exports = calc;