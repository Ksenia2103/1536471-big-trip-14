import EditFormView from '../view/edit-form.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {nanoid} from 'nanoid';
import {USER_ACTION, UPDATE_TYPE, MODE, BLANK_POINT} from '../constants.js';


export default class NewPoint {
  constructor(pointContainer, changeData) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;

    this._pointAddComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._pointAddComponent !== null) {
      return;
    }

    this._pointAddComponent = new EditFormView(BLANK_POINT, MODE.ADD);
    this._pointAddComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointAddComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointContainer, this._pointAddComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointAddComponent === null) {
      return;
    }

    remove(this._pointAddComponent);
    this._pointAddComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MINOR,
      Object.assign(point, {id: nanoid()}),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
