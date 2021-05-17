import SortView from '../view/sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import EmptyEventListView from '../view/empty-event-list.js';
import PointPresenter from './point.js';
import NewPointPresenter from './new-point.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {FILTER_TYPE, SORT_TYPE, UPDATE_TYPE, USER_ACTION} from '../constants.js';
import {sortByDate, sortByDuration, sortByPrice} from '../utils/sort';
import {filter} from '../utils/filters';

export default class Trip {
  constructor(tripContainer, pointModel, filterModel) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._pointModel = pointModel;
    this._filterModel = filterModel;

    this._sortingComponent = null;
    this._tripEventsListComponent = new TripEventsListView();
    this._emptyListComponent = new EmptyEventListView();
    this._actualSortType = SORT_TYPE.DEFAULT;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._newPointPresenter = new NewPointPresenter(this._tripEventsListComponent, this._handleViewAction);
  }

  init() {
    this._renderTrip();
  }

  _renderTrip() {
    if (this._getPoints().length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSorting();
    this._renderPointsList(this._getPoints());
  }

  _renderPointsList(tripPoints) {
    render(this._tripContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);
    tripPoints.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._tripEventsListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(tripPoint);
    this._pointPresenter[tripPoint.id] = pointPresenter;
  }

  _renderNoPoints() {
    render(this._tripContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    remove(this._tripEventsListComponent);

    this._pointModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._newPointPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortingComponent);
    remove(this._emptyListComponent);

    if (resetSortType) {
      this._actualSortType = SORT_TYPE.DEFAULT;
    }
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortView(this._actualSortType);
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleModeChange() {
    this._newPointPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._actualSortType === sortType) {
      return;
    }

    this._actualSortType = sortType;
    this._clearBoard();
    this._renderTrip();
  }

  createPoint() {
    this._actualSortType = SORT_TYPE.DEFAULT;
    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    this._newPointPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._actualSortType) {
      case SORT_TYPE.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SORT_TYPE.TIME:
        return filteredPoints.sort(sortByDuration);
      case SORT_TYPE.DEFAULT:
        return filteredPoints.sort(sortByDate);
    }
    return filteredPoints.sort(sortByDate);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this._pointModel.updatePoint(updateType, update);
        break;
      case USER_ACTION.ADD_POINT:
        this._pointModel.addPoint(updateType, update);
        break;
      case USER_ACTION.DELETE_POINT:
        this._pointModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this._clearBoard();
        this._renderTrip();
        break;
      case UPDATE_TYPE.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderTrip();
        break;
    }
  }
}
