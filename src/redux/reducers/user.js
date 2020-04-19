const userReducerDefaultState = {
  auth: false,
  accountType: null,
  fname: null,
  lname: null,
  signUpMessage: null,
};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        ...state,
        auth: true,
        accountType: action.accountType,
        fname: action.fname,
        lname: action.lname,
        isVerified: action.isVerified,
      };
    case 'LOGGED_OUT':
      localStorage.removeItem('jwt');
      return { ...state, auth: false, accountType: null, fname: null, lname: null };
    case 'SIGNUP_SUCCESS':
      return { ...state, signUpMessage: 'Singup Successfull! You can now login.' };
    case 'UPDATE_PROFILE':
      return { ...state, fname: action.fname, lname: action.lname };
    case 'CLEAR_SIGNUP':
      return { ...state, signUpMessage: null };
    default:
      return state;
  }
};
