export const updateProfile = (data) => {
  return fetch(`http://localhost:8000/user/profile`, {
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
