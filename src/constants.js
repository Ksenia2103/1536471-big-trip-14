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

const STATISTICS_SETTINGS = {
  type: 'horizontalBar',
  backgroundColor: '#ffffff',
  hoverBackgroundColor: '#ffffff',
  dataAnchor: 'start',
  fontSize: 13,
  datalabelsColor: '#000000',
  fontColor: '#000000',
  datalabelsAnchor: 'end',
  datalabelsAlign: 'start',
  titleFontSize: 23,
  titlePosition: 'left',
  padding: 5,
  minBarLength: 100,
  barHeight: 55,
  barThickness: 44,

};

const STATISTICS_TITLES = {
  TYPE: 'TYPE',
  MONEY: 'MONEY',
  TIME_SPENT: 'TIME-SPENT',
};

const MENU_ITEM = {
  TABLE: 'TABLE',
  STATS: 'STATS',
};

export {
  SORT_TYPE,
  USER_ACTION,
  UPDATE_TYPE,
  FILTER_TYPE,
  MODE,
  BLANK_POINT,
  STATISTICS_SETTINGS,
  STATISTICS_TITLES,
  MENU_ITEM
};
