import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (`<div class="trip-filters__filter">
              <input
               id="filter-${name.toLowerCase()}"
               class="trip-filters__filter-input  visually-hidden"
               type="radio" name="trip-filter"
               ${type === currentFilterType ? 'checked' : ''}
               ${count === 0 ? 'disabled' : ''}
               value="${name.toLowerCase()}"
               />
              <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">
                ${name} ${count}
              </label>
            </div>`
  );
};

const createFiltersTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
                ${filterItemsTemplate}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
};

export default class Filters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
