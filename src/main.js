import {generateTripPoint} from './mock/trip-point.js';
import {render} from './utils.js';

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
const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

const tripMain = document.querySelector('.trip-main');
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

render(tripMain, createTripInfoTemplate(tripPoints), 'afterbegin');

const tripInfo = tripMain.querySelector('.trip-info');
render(tripInfo, createTripCostTemplate(tripPoints), 'beforeend');

render(tripControlsNavigation, createMenuTemplate(), 'beforeend');
render(tripControlsFilters, createFiltersTemplate(), 'beforeend');
render(tripEvents, createSortTemplate(), 'beforeend');
render(tripEvents, createTripEventsListTemplate(), 'beforeend');

const tripEventsList  = tripEvents.querySelector('.trip-events__list');
render(tripEventsList, createEditFormTemplate(tripPoints[0]), 'beforeend');
render(tripEventsList, createAddFormTemplate(tripPoints[0]), 'beforeend');

for (let i = 0; i < POINTS_COUNT; i++) {
  render(tripEventsList, createTripPointTemplate(tripPoints[i]), 'beforeend');
}
