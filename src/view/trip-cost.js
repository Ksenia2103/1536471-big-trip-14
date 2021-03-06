import AbstractView from './abstract.js';

const createTripCostTemplate = (points) => {
  const TotalTripCost = points.reduce((totalCost, point) => {
    const {offers, price} = point;

    totalCost += price;

    if (offers) {
      offers.forEach((offer) => totalCost += offer.price);
    }
  }, 0);

  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${TotalTripCost}</span>
          </p>`;
};

export default class TripCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}
