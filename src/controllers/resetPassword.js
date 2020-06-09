export const resetPasswordLink = (body) => {
  return fetch(`http://localhost:8000/user/resetPassword`, {
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
  return fetch(`http://localhost:8000/user/resetPassword?token=${token}`, {
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
