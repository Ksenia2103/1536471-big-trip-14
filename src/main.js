import {generateTripPoint} from './mock/trip-point.js';
import {render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import SiteMenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filters.js';

const POINTS_COUNT = 3;
const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

const pointModel = new PointsModel();
pointModel.setPoints(tripPoints);
const filterModel = new FilterModel();

const tripMain = document.querySelector('.trip-main');
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEvents, pointModel, filterModel);

render(tripControlsNavigation, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripMain, new TripInfoView(tripPoints), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector('.trip-info');
render(tripInfo, new TripCostView(tripPoints), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointModel);
filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn')
  .addEventListener('click', (evt) => {
    evt.preventDefault();
    tripPresenter.createPoint();
  });
