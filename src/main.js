import {generateTripPoint} from './mock/trip-point.js';
import {render, RenderPosition} from './utils.js';

import SiteMenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import EditFormView from './view/edit-form.js';
import FiltersView from './view/filters.js';
import SortView from './view/sort.js';
import TripEventsListView from './view/trip-events-list.js';
import TripPointView from './view/trip-point.js';
import EmptyEventListView from './view/empty-event-list.js';

const POINTS_COUNT = 3;
const tripPoints = new Array(POINTS_COUNT).fill().map(generateTripPoint);

const renderPoint = (tripPointsList, point) => {
  const pointComponent = new TripPointView(point);
  const pointEditComponent = new EditFormView(point);

  const replacePointToForm = () => {
    tripPointsList.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
    document.addEventListener('keydown', onEscKeyDown);
    pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', replaceFormToPoint);
  };

  const replaceFormToPoint = () => {
    tripPointsList.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
    document.removeEventListener('keydown', onEscKeyDown);
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  render(tripPointsList, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const tripMain = document.querySelector('.trip-main');
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

render(tripControlsNavigation, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(tripControlsFilters, new FiltersView().getElement(), RenderPosition.BEFOREEND);

if (tripPoints.length === 0) {
  render(tripEvents, new EmptyEventListView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripMain, new TripInfoView(tripPoints).getElement(), RenderPosition.AFTERBEGIN);

  const tripInfo = tripMain.querySelector('.trip-info');
  render(tripInfo, new TripCostView(tripPoints).getElement(), RenderPosition.BEFOREEND);

  render(tripEvents, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(tripEvents, new TripEventsListView().getElement(), RenderPosition.BEFOREEND);

  const tripEventsList = tripEvents.querySelector('.trip-events__list');
  for (let i = 0; i < POINTS_COUNT; i++) {
    renderPoint(tripEventsList, tripPoints[i]);
  }
}
