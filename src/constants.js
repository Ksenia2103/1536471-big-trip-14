import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const SORT_TYPE = {
  DEFAULT: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const MODE = {
  EDIT: 'edit',
  ADD: 'add',
};

const BLANK_POINT = {
  id: nanoid(),
  type: 'Taxi',
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  price: '',
  offers: [],
  isFavourite: false,
};

export {SORT_TYPE, USER_ACTION, UPDATE_TYPE, FILTER_TYPE, MODE, BLANK_POINT};
