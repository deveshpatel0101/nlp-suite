import moment from 'moment';
import arraySort from 'array-sort';

export const getByMonth = (data) => {
  if (data.length === 0) {
    return { labels: addBeforeAfter([], 'months'), count: [] };
  }

  data = arraySort(data);

  let month = [];
  let count = [];
  let temp = 0;

  month.push(moment(window.parseInt(data[0])).format('MMMM'));
  count[0] = 1;

  for (let i = 1; i < data.length; i++) {
    if (moment(parseInt(data[i])).format('MMMM') === month[temp]) {
      count[temp]++;
    } else {
      month.push(moment(parseInt(data[i])).format('MMMM'));
      temp++;
      count[temp] = 1;
    }
  }

  addBeforeAfter(month, 'months');
  return { labels: month, count };
};

export const getByDay = (data) => {
  if (data.length === 0) {
    return { labels: addBeforeAfter([], 'days'), count: [] };
  }

  data = arraySort(data);
  let day = [];
  let count = [];
  let temp = 0;

  day.push(moment(window.parseInt(data[0])).format('DD-MMM'));
  count[0] = 1;

  for (let i = 1; i < data.length; i++) {
    if (moment(parseInt(data[i])).format('DD-MMM') === day[temp]) {
      count[temp]++;
    } else {
      day.push(moment(parseInt(data[i])).format('DD-MMM'));
      temp++;
      count[temp] = 1;
    }
  }

  addBeforeAfter(day, 'days');
  return { labels: day, count };
};

export const getByYear = (data) => {
  if (data.length === 0) {
    return { labels: addBeforeAfter([], 'years'), count: [] };
  }

  data = arraySort(data);

  let year = [];
  let count = [];
  let temp = 0;

  year.push(moment(window.parseInt(data[0])).format('YYYY'));
  count[0] = 1;

  for (let i = 1; i < data.length; i++) {
    if (moment(parseInt(data[i])).format('YYYY') === year[temp]) {
      count[temp]++;
    } else {
      year.push(moment(parseInt(data[i])).format('YYYY'));
      temp++;
      count[temp] = 1;
    }
  }

  addBeforeAfter(year, 'years');
  return { labels: year, count };
};

// days, months, years
export const addBeforeAfter = (data, type) => {
  if (data.length === 0) {
    for (let i = 0; i < 5; i++) {
      if (!data[data.length - 1]) {
        data.push(moment().format('DD-MMM-YYYY'));
      } else {
        data.push(
          moment(data[data.length - 1])
            .add(1, type)
            .format('DD-MMM-YYYY'),
        );
      }
    }
    for (let i = 0; i<data.length; i++) {
      data[i] = moment(data[i]).format('DD-MMM');
    }
    return data;
  }

  for (let i = 0; i < 5; i++) {
    data.push(
      moment(data[data.length - 1])
        .add(1, type)
        .format('DD-MMM'),
    );
  }
  return data;
};
