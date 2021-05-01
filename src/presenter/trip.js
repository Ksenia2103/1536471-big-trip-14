import SortView from '../view/sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import EmptyEventListView from '../view/empty-event-list.js';
import PointPresenter from './point.js';
import {render, RenderPosition} from '../utils/render';
import {updateItem} from '../utils/common';


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._sortingComponent = new SortView();
    this._tripEventsListComponent = new TripEventsListView();
    this._emptyListComponent = new EmptyEventListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._renderTrip();
  }

  _renderTrip () {
    if (this._tripPoints.length === 0) {
      render(this._tripContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    this._renderPointsList();
  }

  _renderPointsList () {
    render(this._tripContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);
    this._tripPoints.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderPoint (tripPoint) {
    const pointPresenter = new PointPresenter(this._tripEventsListComponent,  this._handlePointChange,  this._handleModeChange);
    pointPresenter.init(tripPoint);
    this._pointPresenter[tripPoint.id] = pointPresenter;
  }

  _clearPointsList () {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

}
