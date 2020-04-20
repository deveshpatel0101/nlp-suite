export const sendVerifyEmailLink = () => {
  return fetch(`https://nlp-suite-backend.herokuapp.com/user/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('jwt'),
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      return {};
    });
};

export const verifyEmail = (token) => {
  return fetch(`https://nlp-suite-backend.herokuapp.com/user/verify?token=${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      return {};
    });
};
