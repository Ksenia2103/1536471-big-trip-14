const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomNumber = function (min, max) {
  if (min < max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
};

const getRandomElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {
  getRandomInteger,
  getRandomElement,
  updateItem
};
