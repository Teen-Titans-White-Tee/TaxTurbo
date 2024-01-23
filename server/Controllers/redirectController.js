/* NOT BEING USED, USING NAVIGATE FROM REACT*/


const redirect = {};

redirect.dashboard = (req, res, next) => {
  console.log ('YOU ARE SIGNED IN');
  res.redirect('/dashboard');
  return next();
};

module.exports = redirect;