export const getToken = (name) => {
  return fetch(`https://nlp-suite-backend.herokuapp.com/project/token?name=${name}`, {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      return {};
    });
};
