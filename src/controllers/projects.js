export const getProjects = () => {
  return fetch(`http://localhost:8000/user/project`, {
    method: 'GET',
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

export const addProject = (data) => {
  return fetch(`http://localhost:8000/user/project`, {
    method: 'POST',
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

export const deleteProject = (data) => {
  return fetch(`http://localhost:8000/user/project`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('jwt'),
    },
    body: JSON.stringify(data),
  })
    .then((result) => result.json())
    .catch((err) => {
      return {};
    });
};
