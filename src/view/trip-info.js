import {getDateFormat} from '../utils.js';

export const createTripInfoTemplate = (points) => {
  const tripData = {
    route: '',
    range: '',
  };

  points.map((point, index) => {

    if (index === 0) {
      tripData.route += point.destination.name;
      tripData.range += getDateFormat(point.dateFrom, 'D MMM');
    }

    if (index === 1 && points.length > 3) {
      tripData.route += '&nbsp;&mdash;&nbsp;...';
    }

    if (index === 1 && points.length === 3) {
      tripData.route += '&nbsp;&mdash;&nbsp;' + point.destination.name;
    }

    if (index !== 0 && index === points.length - 1) {
      tripData.route += '&nbsp;&mdash;&nbsp;' + point.destination.name;
      tripData.range += '&nbsp;&mdash;&nbsp;' + getDateFormat(point.dateTo, 'D MMM');
    }
  });

  const tripRoute = tripData.route;
  const tripDate = tripData.range;

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripRoute}</h1>

              <p class="trip-info__dates">${tripDate}</p>
            </div>
          </section>`;
};
