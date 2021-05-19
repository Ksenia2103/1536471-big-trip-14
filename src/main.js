import {generateTripPoint} from './mock/trip-point.js';
import {render, RenderPosition, remove} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import SiteMenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filters.js';
import StatisticsView from './view/statistics.js';
import {FILTER_TYPE, MENU_ITEM, UPDATE_TYPE} from './constants.js';

let statisticsComponent = null;
const POINTS_COUNT = 3;
const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

const pointModel = new PointsModel();
pointModel.setPoints(tripPoints);
const filterModel = new FilterModel();

const tripMain = document.querySelector('.trip-main');
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pageMainElement = document.querySelector('.page-main');
const pointAddButton = tripMain.querySelector('.trip-main__event-add-btn');

const tripPresenter = new TripPresenter(tripEvents, pointModel, filterModel);

const siteMenuComponent = new SiteMenuView();
render(tripControlsNavigation, siteMenuComponent, RenderPosition.BEFOREEND);
render(tripMain, new TripInfoView(tripPoints), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector('.trip-info');
render(tripInfo, new TripCostView(tripPoints), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointModel);
filterPresenter.init();

pointAddButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MENU_ITEM.TABLE:
      remove(statisticsComponent);
      filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
      tripPresenter.init();
      siteMenuComponent.setMenuItem(MENU_ITEM.TABLE);
      break;
    case MENU_ITEM.STATS:
      tripPresenter.destroy();
      remove(statisticsComponent);
      statisticsComponent = new StatisticsView(pointModel.getPoints());
      render(pageMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      siteMenuComponent.setMenuItem(MENU_ITEM.STATS);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

tripPresenter.init();
