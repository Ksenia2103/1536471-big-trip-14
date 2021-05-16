import {FILTER_TYPE} from '../constants.js';
import {isFutureDate, isPastDate} from './date.js';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => {
    return points;
  },
  [FILTER_TYPE.FUTURE]: (points) => {
    return points.filter((point) => isFutureDate(point));
  },
  [FILTER_TYPE.PAST]: (points) => {
    return points.filter((point) => isPastDate(point));
  },
};

export {filter};
