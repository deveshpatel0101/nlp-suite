export const getToken = (name) => {
  return fetch(`http://localhost:8000/project/token?name=${name}`, {
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
