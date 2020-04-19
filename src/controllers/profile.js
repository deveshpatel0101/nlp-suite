export const updateProfile = (data) => {
  return fetch(`https://nlp-suite-backend.herokuapp.com/user/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('jwt'),
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      return {};
    });
};
