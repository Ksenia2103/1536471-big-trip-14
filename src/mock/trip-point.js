import {getRandomInteger, getRandomElement, getDateFrom, getDateTo} from '../utils.js';
import {TRIP_POINT_TYPES} from './constants.js';

let idPoint = 0;

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Madrid' , 'Berlin', 'Milan', 'Rome', 'Vienna', 'Paris'];
const DESCRIPTIONS  = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const PICTURES_SOURCE = 'http://picsum.photos/248/152?r=';
const OFFERS = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train', 'Order Uber', 'Rent a car', 'Add breakfast', 'Book tickets', 'Lunch in city'];

const generateDescription = () => {
  const descriptionText = [];
  const count = getRandomInteger(1, 5);

  for (let i = 0; i < count; i++) {
    descriptionText.push(getRandomElement(DESCRIPTIONS));
  }

  return descriptionText.join(' ');
};

const generatePictures = () => {
  const picturesArray = [];
  const count = getRandomInteger(1, 5);

  for (let i = 0; i < count; i++) {
    const picture = {};
    picture.src = `${PICTURES_SOURCE}${getRandomInteger(1, 30)}`;
    picture.description = `picture_${getRandomInteger(1, 30)}`;
    picturesArray.push(picture);
  }
  return picturesArray;
};

const generateOffers = () => {
  const offersList = [];
  const shuffleOffersList = OFFERS.sort(() => Math.random() - 0.5);
  const count = getRandomInteger(1, 10);

  for (let i = 0; i < count; i++) {
    const offer = {
      title: shuffleOffersList[i],
      price: getRandomInteger(50, 1000),
    };
    offersList.push(offer);
  }

  return offersList;
};

const generateTripPoint = () => {
  const dateFrom = getDateFrom();

  return {
    id: idPoint++,
    type: getRandomElement(TRIP_POINT_TYPES),
    destination: {
      name: getRandomElement(CITIES),
      description: generateDescription(),
      pictures: generatePictures(),
    },
    dateFrom: dateFrom,
    dateTo: getDateTo(dateFrom),
    price: getRandomInteger(100, 1000),
    offers: generateOffers(),
    isFavorite: Boolean(getRandomInteger()),
  };
};

export {generateTripPoint};
