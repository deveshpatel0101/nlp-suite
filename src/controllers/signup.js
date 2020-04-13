export const signup = (data) => {
  return fetch('https://nlp-suite-backend.herokuapp.com/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      return resData;
    })
    .catch((err) => {
      return {};
    });
};
