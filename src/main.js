import {generateTripPoint} from './mock/trip-point.js';
import {render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';

import SiteMenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import FiltersView from './view/filters.js';

const POINTS_COUNT = 3;
const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

const tripMain = document.querySelector('.trip-main');
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEvents, tripMain, tripControlsNavigation, tripControlsFilters);

render(tripControlsNavigation, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripControlsFilters, new FiltersView(), RenderPosition.BEFOREEND);
render(tripMain, new TripInfoView(tripPoints), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector('.trip-info');
render(tripInfo, new TripCostView(tripPoints), RenderPosition.BEFOREEND);

tripPresenter.init(tripPoints);
