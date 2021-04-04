import {createMenuTemplate} from './view/menu.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createAddFormTemplate} from './view/add-form.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortTemplate} from './view/sort.js';
import {createTripEventsListTemplate} from './view/trip-events-list.js';
import {createTripPointTemplate} from './view/trip-point.js';

const POINTS_COUNT = 3;

const tripMain = document.querySelector('.trip-main');
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripMain, createTripInfoTemplate(), 'afterbegin');

const tripInfo = tripMain.querySelector('.trip-info');
render(tripInfo, createTripCostTemplate(), 'beforeend');

render(tripControlsNavigation, createMenuTemplate(), 'beforeend');
render(tripControlsFilters, createFiltersTemplate(), 'beforeend');
render(tripEvents, createSortTemplate(), 'beforeend');
render(tripEvents, createTripEventsListTemplate(), 'beforeend');

const tripEventsList  = tripEvents.querySelector('.trip-events__list');
render(tripEventsList, createEditFormTemplate(), 'beforeend');
render(tripEventsList, createAddFormTemplate(), 'beforeend');

for (let i = 0; i < POINTS_COUNT; i++) {
  render(tripEventsList, createTripPointTemplate(), 'beforeend');
}
