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
    updateUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.firstName = action.payload.firstName;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userName } = userSlice.actions;

export default userSlice.reducer;