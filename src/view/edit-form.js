import {getDateFormat} from '../utils/date.js';
import {generateDestinations, generateOffers} from '../mock/trip-point.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {CITIES} from '../mock/trip-point.js';
import {TRIP_POINT_TYPES} from '../mock/constants.js';

const createDestinationListTemplate = (cities) => {
  return `<datalist id="destination-list-1">
            ${cities.map((city) => `<option value=${city}></option>`).join('')}
                    </datalist>`;
};

const createTypesListTemplate = (types, actualType) => {
  return types.map((type) => {
    return `<div class="event__type-item">
                <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type} ${actualType.toLowerCase() === type.toLowerCase() ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
            </div>`;
  }).join('');
};

const createOffersListTemplate = (offers, hasOffers) => {
  if (!hasOffers) {
    return '';
  }

  return offers.map((offer, index) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-name-${index + 1}" type="checkbox" name="event-offer-name">
      <label class="event__offer-label" for="event-offer-name-${index + 1}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`,
  ).join('');
};

const createOffersTemplate = (offers, hasOffers) => {
  return hasOffers ? `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                        ${createOffersListTemplate(offers, hasOffers)}
                    </div>
                  </section>` : '';
};

const createImagesTemplate = (pictures, hasImages) => {
  if (!hasImages) {
    return '';
  }

  return pictures.map((picture) => {
    return `<img class="event__photo" src=${picture.src} alt=${picture.description}>`;
  }).join('');
};

const createDescriptionTemplate = (description, pictures, hasDescription, hasImages) => {
  if (!hasDescription && !hasImages) {
    return '';
  }

  return `     <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createImagesTemplate(pictures, hasImages)}
                      </div>
                    </div>
                  </section>`;
};

const createEditFormTemplate = (point = {}) => {
  const {
    type,
    destination = {},
    dateFrom,
    dateTo,
    price,
    offers = [],
    hasDescription,
    hasOffers,
    hasImages,
  } = point;

  const {name, description, pictures} = destination;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createTypesListTemplate(TRIP_POINT_TYPES, type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                    ${createDestinationListTemplate(CITIES)}
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateFormat(dateFrom, 'DD/MM/YY HH:mm')}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateFormat(dateTo, 'DD/MM/YY HH:mm')}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${createOffersTemplate(offers, hasOffers)}
                ${createDescriptionTemplate(description, pictures, hasDescription, hasImages)}
                </section>
              </form>
            </li>`;
};

export default class EditForm extends SmartView {
  constructor(point) {
    super();
    this._data = EditForm.parsePointToState(point);
    this._fromDatePicker = null;
    this._toDatePicker = null;

    this._destinations = generateDestinations();

    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickerFrom();
    this._setDatepickerTo();
  }

  getTemplate() {
    return createEditFormTemplate(this._data);
  }

  reset(point) {
    this.updateState(
      EditForm.parsePointToState(point),
    );
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-list').addEventListener('change', this._typeToggleHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationToggleHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this._setDatepickerFrom();
    this._setDatepickerTo();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditForm.parseStateToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick(EditForm.parseStateToPoint(this._data));
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    const newType = evt.target.value;
    const offersByType = generateOffers();

    this.updateState({
      type: newType,
      offers: offersByType,
      hasOffers: offersByType.length > 0,
    });
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();
    const newDestination = this._destinations.find((destination) => destination.name === evt.target.value);

    if (!newDestination) {
      evt.target.setCustomValidity('destination not found');
      evt.target.reportValidity();
      return;
    }

    this.updateState({
      destination: newDestination,
      hasDescription: this._data.destination.description !== null,
      hasImages: this._data.destination.pictures !== null,
    });
  }

  _dateFromChangeHandler([userDate]) {
    this.updateState({
      dateFrom: userDate,
    });
  }

  _dateToChangeHandler([userDate]) {
    this.updateState({
      dateTo: userDate,
    });
  }

  _setDatepickerFrom() {
    if (this._fromDatePicker) {
      this._fromDatePicker.destroy();
      this._fromDatePicker = null;
    }

    if (this._data.dateFrom) {
      this._fromDatePicker = flatpickr(
        this.getElement().querySelector('#event-start-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y h:i',
          defaultDate: this._data.dateFrom,
          onChange: this._dateFromChangeHandler,
        },
      );
    }
  }

  _setDatepickerTo() {
    if (this._toDatePicker) {
      this._toDatePicker.destroy();
      this._toDatePicker = null;
    }

    if (this._data.dateTo) {
      this._toDatePicker = flatpickr(
        this.getElement().querySelector('#event-end-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y h:i',
          defaultDate: this._data.dateTo,
          onChange: this._dateToChangeHandler,
        },
      );
    }
  }

  static parsePointToState(point) {
    return Object.assign(
      {},
      point,
      {
        hasOffers: point.offers !== null,
        hasDescription: point.destination.description !== null,
        hasImages: point.destination.pictures !== null,
      },
    );
  }

  static parseStateToPoint(state) {
    state = Object.assign({}, state);

    if (!state.hasOffers) {
      state.offers = null;
    }

    if (!state.hasDescription) {
      state.destination.description = null;
    }

    if (!state.hasImages) {
      state.destination.picture = null;
    }

    delete state.hasOffers;
    delete state.hasDescription;
    delete state.hasImages;

    return state;
  }
}
