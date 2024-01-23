const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const validator = require('validator');
const MONGO_URI = 'mongodb+srv://moisesgomezr9:L37udLyPOFIfqRtM@scratch-project.j3hrygw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'scratch-project'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  transMedicare: Number,
  transSSI: Number,
  transFed: Number,
  transState: Number,

}, {
  timestamps: true,
});

const expenseSchema = new Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  transMedicare: Number,
  transSSI: Number,
  transFed: Number,
  transState: Number,
} , {
  timestamps: true,

});

const personSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String },
  password: {type: String, unique: true, required: true},
  filingStatus: String,
  state: String,
  industry: String,
  email: String,
  estimatedIncome: Number,
  businessExpenses: Number,
  preTaxRetirementContributions: Number,
  medicareTax: Number,
  ssiTax: Number,
  fedTax: Number,
  stateTax: Number,

  incomes: [incomeSchema],
  expenses: [expenseSchema]
});

//maybe use this is a pre method before storing in to collection ? 

// static signup method 
personSchema.statics.signup = async function(firstName, lastName, password, email) {  
  console.log('Received data:', { firstName, lastName, password, email });

  // validation 
  if(!firstName || !lastName || !password || !email ) {
    throw Error('All fields must be filled');
  }  
  // this method from validator checks if email is a valid email 

  if(!validator.isEmail(email)) {
    throw Error('Email is not valid'); 
  }  
  //checks if password is valid 

  if(!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  // we use this here because we don't yet have access to Person model 

  const exists = await this.findOne({ email }); 

  // check if the email exists if so throw an error  

  if (exists) {
    throw Error('Email already in use');
  } 
  // generate salt and hash
  const salt = await bcrypt.genSalt(10); 
  const hash = await bcrypt.hash(password, salt);  

  // store email and password in database
  const user = await this.create({email, password: hash, firstName}); 

  return user;


}; 

// static login method 
personSchema.statics.login = async function(email, password) {
  if(!email || !password) {
    throw Error('All fields must be filled');
  }  
  // finds user in database with target email
  const user = await this.findOne({email}); 

  if(!user) {
    throw Error('Incorrect email');
  } 
  //compares password to hashed password
  const match = await bcrypt.compare(password, user.password); 

  if(!match) {
    throw Error('Incorrect password');
  } 
  return user;
};
const Person = mongoose.model('person', personSchema); 


module.exports = { Person };
