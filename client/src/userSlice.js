import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  firstName: '',
  lastName: '',
  password: '',
  filingStatus: '',
  state: '',
  // industry,
  email: '',
  estimatedIncome: 0,
  businessExpenses: 0,
  preTaxRetirementContributions: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatedUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.filingStatus = action.payload.state;
      state.estimatedIncome = action.payload.state;
      state.estimatedExpenses = action.payload.state;
      state.preTaxRetirementContributions = action.payload.preTaxRetirementContributions; // is there a shorter way to write all this?
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatedUser } = userSlice.actions;

export default userSlice.reducer;