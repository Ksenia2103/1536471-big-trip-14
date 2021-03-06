import AbstractView from './abstract.js';

const createEmptyEventListTemplate = () => {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

export default class EmptyEventList extends AbstractView {
  getTemplate() {
    return createEmptyEventListTemplate();
  }
}
