export const sendVerifyEmailLink = () => {
  return fetch(`http://localhost:8000/user/verify`, {
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
  return fetch(`http://localhost:8000/user/verify?token=${token}`, {
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
