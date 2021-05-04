import dayjs from 'dayjs';
import {getDuration} from './date.js';

const sortByDate = (pointA, pointB) => {
  const startDatePointA = dayjs(pointA.dateFrom);
  const startDatePointB = dayjs(pointB.dateFrom);

  return startDatePointA - startDatePointB;
};

const sortByPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

const sortByDuration = (pointA, pointB) => {
  const durationPointA = getDuration(pointA.dateFrom, pointA.dateTo);
  const durationPointB = getDuration(pointB.dateFrom, pointB.dateTo);

  return durationPointB - durationPointA;
};

export {sortByDate, sortByPrice, sortByDuration};
