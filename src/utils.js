import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const MAX_MONTH_GAP = 3;
const MAX_DAYS_GAP = 7;
const MAX_HOURS_GAP = 23;
const MAX_MINUTES_GAP = 59;
const HourToMinutes = 60;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomNumber = function (min, max) {
  if (min < max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
};

const getRandomElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const getDateFrom = () => {
  const monthGap = getRandomInteger(0, MAX_MONTH_GAP);
  const daysGap = getRandomInteger(0, MAX_DAYS_GAP);
  const hoursGap = getRandomInteger(0, MAX_HOURS_GAP);
  const minutesGap = getRandomInteger(0, MAX_MINUTES_GAP);

  return dayjs().add(monthGap, 'month').add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute').toDate();
};

const getDateTo = (dateFrom) => {
  const monthGap = getRandomInteger(0, MAX_MONTH_GAP);
  const daysGap = getRandomInteger(0, MAX_DAYS_GAP);
  const hoursGap = getRandomInteger(0, MAX_HOURS_GAP);
  const minutesGap = getRandomInteger(0, MAX_MINUTES_GAP);

  return dayjs(dateFrom).add(monthGap, 'month').add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute').toDate();
};

const getDateFormat = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

const calculateDuration = (dateFrom, dateTo) => {
  if (!dateFrom || !dateTo) {
    return null;
  }

  const dateIn = dayjs(dateFrom);
  const dateOut = dayjs(dateTo);
  return dayjs.duration(dateIn.diff(dateOut, 'minute'));
};

export const separateTimeDuration = (duration) => {
  const minutes = Math.floor(duration % 60);
  const hours = Math.floor((duration / 60) % 24);
  const days = Math.round(duration / 60 / 24);

  return {
    minutes,
    hours,
    days,
  };
};

const addLeadingZero = (value) => {
  if (value.toString().length > 1) {
    return value;
  } else {
    return `0${value}`;
  }
};

const getDurationFormat = (duration) => {
  if (!duration) {
    return '';
  }

  const {minutes, hours, days} = separateTimeDuration(duration);

  if (duration < HourToMinutes) {
    return `${dayjs(duration).format('mm')}M`;
  } else {
    if (days > 0) {
      return `${addLeadingZero(days)}D ${addLeadingZero(hours)}H ${addLeadingZero(minutes)}M`;
    } else {
      return `${addLeadingZero(hours)}H ${addLeadingZero(minutes)}M`;
    }
  }
};

export {
  render,
  getRandomInteger,
  getRandomElement,
  getDateFrom,
  getDateTo,
  getDateFormat,
  calculateDuration,
  getDurationFormat
};
