export const getRequests = (name) => {
  return fetch(`http://localhost:8000/project/usage?name=${name}`, {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('jwt'),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        return data;
      }

      const toReturn = {};
      if (data.results.requests.translator) {
        toReturn.translator = {
          datasets: [
            {
              ...initJson.datasets[0],
              label: 'Translator',
              data: data.results.requests.translator,
              backgroundColor: colors.translator.backgroundColor,
              borderColor: colors.translator.borderColor,
            },
          ],
        };
      }
      if (data.results.requests.entities) {
        toReturn.entities = {
          datasets: [
            {
              ...initJson.datasets[0],
              label: 'Entities',
              data: data.results.requests.entities,
              backgroundColor: colors.entities.backgroundColor,
              borderColor: colors.entities.borderColor,
            },
          ],
        };
      }
      if (data.results.requests.summarizer) {
        toReturn.summarizer = {
          datasets: [
            {
              ...initJson.datasets[0],
              label: 'Summarizer',
              data: data.results.requests.summarizer,
              backgroundColor: colors.summarizer.backgroundColor,
              borderColor: colors.summarizer.borderColor,
            },
          ],
        };
      }
      if (data.results.requests.sentiment) {
        toReturn.sentiment = {
          datasets: [
            {
              ...initJson.datasets[0],
              label: 'Sentiment',
              data: data.results.requests.sentiment,
              backgroundColor: colors.sentiment.backgroundColor,
              borderColor: colors.sentiment.borderColor,
            },
          ],
        };
      }
      return toReturn;
    })
    .catch((err) => {
      return {};
    });
};

const initJson = {
  datasets: [
    {
      data: [],
      label: '',
      backgroundColor: 'rgba(15,157,88, 0.9)',
      borderColor: 'rgba(15,157,88, 0.1)',
      borderWidth: '1',
    },
  ],
};

const colors = {
  translator: { backgroundColor: 'rgba(15,157,88, 0.4)', borderColor: 'rgba(15,157,88, 0.9)' },
  entities: { backgroundColor: 'rgba(66,133,244, 0.4)', borderColor: 'rgba(66,133,244, 0.9)' },
  sentiment: { backgroundColor: 'rgba(255, 143, 32, 0.4)', borderColor: 'rgba(255, 143, 32, 0.9)' },
  summarizer: {
    backgroundColor: 'rgba(255, 99, 132, 0.4)',
    borderColor: 'rgba(255, 99, 132, 0.9)',
  },
};
