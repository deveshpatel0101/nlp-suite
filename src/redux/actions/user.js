export const userLogOut = () => ({
  type: 'LOGGED_OUT',
});

export const userLogin = (data) => ({
  type: 'LOGGED_IN',
  accountType: data.accountType,
  fname: data.fname,
  lname: data.lname,
  isVerified: data.isVerified,
});

export const userSignUp = () => ({
  type: 'SINGUP_SUCCESS',
});

export const clearSignUp = () => ({
  type: 'CLEAR_SIGNUP',
});

export const updateUserProfile = (profile) => ({
  type: 'UPDATE_PROFILE',
  fname: profile.fname,
  lname: profile.lname,
});
