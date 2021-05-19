import {getDuration} from './date.js';

const getUniqueItems = (items) => {
  return [...new Set(items)];
};

const getCostsByTripType = (tripPoints, type) => {
  const pointsByType = tripPoints.filter((tripPoint) => tripPoint.type === type);
  return pointsByType.reduce((sum, item) => sum + item.price, 0);
};

const countPointsByTripType = (tripPoints, type) => {
  return tripPoints.filter((tripPoint) => tripPoint.type === type).length;
};

const getDurationByTripType = (tripPoints, type) => {
  const allTripEventsTypes = tripPoints.filter((tripPoint) => tripPoint.type === type);
  return allTripEventsTypes.reduce((totalDuration, tripPoint) => {
    return totalDuration + getDuration(tripPoint.dateFrom, tripPoint.dateTo);
  }, 0);
};

export {getDurationByTripType, getCostsByTripType, getUniqueItems, countPointsByTripType};
