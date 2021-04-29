import {generateTripPoint} from './mock/trip-point.js';
import {render, RenderPosition,replace} from './utils/render.js';

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
    replace(pointEditComponent, pointComponent);
    document.addEventListener('keydown', onEscKeyDown);
    pointEditComponent.setEditClickHandler(() => {
      replaceFormToPoint();
    });
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
    document.removeEventListener('keydown', onEscKeyDown);
  };

  pointComponent.setClickHandler(() => {
    replacePointToForm();
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  render(tripPointsList, pointComponent, RenderPosition.BEFOREEND);
};

const tripMain = document.querySelector('.trip-main');
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

render(tripControlsNavigation, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripControlsFilters, new FiltersView(), RenderPosition.BEFOREEND);

if (tripPoints.length === 0) {
  render(tripEvents, new EmptyEventListView(), RenderPosition.BEFOREEND);
} else {
  render(tripMain, new TripInfoView(tripPoints), RenderPosition.AFTERBEGIN);

  const tripInfo = tripMain.querySelector('.trip-info');
  render(tripInfo, new TripCostView(tripPoints), RenderPosition.BEFOREEND);

  render(tripEvents, new SortView(), RenderPosition.BEFOREEND);
  render(tripEvents, new TripEventsListView(), RenderPosition.BEFOREEND);

  const tripEventsList = tripEvents.querySelector('.trip-events__list');
  for (let i = 0; i < POINTS_COUNT; i++) {
    renderPoint(tripEventsList, tripPoints[i]);
  }
}
