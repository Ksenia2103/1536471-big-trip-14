import FiltersView from '../view/filters.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {FILTER_TYPE, UPDATE_TYPE} from '../constants.js';
import {filter} from '../utils/filters';

export default class Filters {
  constructor(filterContainer, filterModel, pointModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointModel = pointModel;

    this._filterComponent = null;

    this._handleFilterModel = this._handleFilterModel.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._filterModel.addObserver(this._handleFilterModel);
    this._pointModel.addObserver(this._handleFilterModel);
  }

  init() {
    const filters = this._getFilters();

    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FiltersView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._filterTypeChangeHandler);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleFilterModel() {
    this.init();
  }

  _filterTypeChangeHandler(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  }

  _getFilters() {
    const tripPoints = this._pointModel.getPoints();

    return [
      {
        type: FILTER_TYPE.EVERYTHING,
        name: 'Everything',
        count: filter[FILTER_TYPE.EVERYTHING](tripPoints).length,
      },
      {
        type: FILTER_TYPE.PAST,
        name: 'Past',
        count: filter[FILTER_TYPE.PAST](tripPoints).length,
      },
      {
        type: FILTER_TYPE.FUTURE,
        name: 'Future',
        count: filter[FILTER_TYPE.FUTURE](tripPoints).length,
      },
    ];
  }
}
