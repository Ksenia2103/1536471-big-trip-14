import EditFormView from '../view/edit-form.js';
import TripPointView from '../view/trip-point.js';
import {remove, render, RenderPosition, replace} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(pointsListContainer, changeData, changeMode) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditPointComponent = this._pointEditComponent;

    this._pointComponent = new TripPointView(this._point);//(point);
    this._pointEditComponent = new EditFormView(this._point);//(point);

    this._pointComponent.setClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointComponent.setFavouriteClickHandler(this._handleFavouriteClick);
    this._pointEditComponent.setEditClickHandler(this._handleCloseClick);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this._pointsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormByPoint();
    }
  }

  _replacePointByForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormByPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormByPoint();
    }
  }

  _handleEditClick() {
    this._replacePointByForm();
  }

  _handleFormSubmit(evt) {
    this._changeData(evt);
    this._replaceFormByPoint();
  }

  _handleFavouriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handleCloseClick() {
    this._pointEditComponent.reset(this._point);
    this._replaceFormByPoint();
  }
}
