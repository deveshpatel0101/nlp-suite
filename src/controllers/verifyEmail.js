export const verifyEmail = () => {
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
