export const resetPasswordLink = (body) => {
  return fetch(`https://nlp-suite-backend.herokuapp.com/user/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => {
      return {};
    });
};

export const resetPassword = (body, token) => {
  return fetch(`https://nlp-suite-backend.herokuapp.com/user/resetPassword?token=${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => {
      return {};
    });
};
