export const signin = (data) => {
  return fetch('http://localhost:8000/user/login', {
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
      return {}
    });
};
