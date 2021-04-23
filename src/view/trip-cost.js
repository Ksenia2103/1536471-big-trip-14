import {createElement} from '../utils.js';

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

export default class TripCost {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
