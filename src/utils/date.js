import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {getRandomInteger} from './common.js';

dayjs.extend(duration);

const MAX_MONTH_GAP = 3;
const MAX_DAYS_GAP = 7;
const MAX_HOURS_GAP = 23;
const MAX_MINUTES_GAP = 59;

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

const separateTimeDuration = (duration) => {
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

  const daysValue = String(days).padStart(2, '0');
  const hoursValue = String(hours).padStart(2, '0');
  const minutesValue = String(minutes).padStart(2, '0');

  if (days > 0) {
    return `${daysValue}D ${hoursValue}H ${minutesValue}M`;
  } else if (hours > 0) {
    return `${hoursValue}H ${minutesValue}M`;
  }
  return `${minutesValue}M`;
};

const getDuration = (dateFrom, dateTo) => {
  return dayjs(dateTo).diff(dayjs(dateFrom));
};

export {
  getDateFrom,
  getDateTo,
  getDateFormat,
  getDurationFormat,
  separateTimeDuration,
  getDuration
};
