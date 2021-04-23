import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const MAX_MONTH_GAP = 3;
const MAX_DAYS_GAP = 7;
const MAX_HOURS_GAP = 23;
const MAX_MINUTES_GAP = 59;

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
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

const getDurationFormat = (dateFrom, dateTo) => {
  if (!dateFrom || !dateTo) {
    return null;
  }

  const duration = dayjs(dateTo).diff(dayjs(dateFrom));
  const days = dayjs.duration(duration).days();
  const hours = dayjs.duration(duration).hours();
  const minutes = dayjs.duration(duration).minutes();

  const daysValue = String(minutes).padStart(2, '0');
  const hoursValue = String(hours).padStart(2, '0');
  const minutesValue = String(days).padStart(2, '0');

  if (days > 0) {
    return `${daysValue}D ${hoursValue}H ${minutesValue}M`;
  } else if (hours > 0) {
    return `${hoursValue}H ${minutesValue}M`;
  }
  return `${minutesValue}M`;
};

export {
  render,
  getRandomInteger,
  getRandomElement,
  getDateFrom,
  getDateTo,
  getDateFormat,
  getDurationFormat,
  createElement
};
