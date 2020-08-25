export const randomNum = (num, base = 0) => {
  return Math.floor(Math.random() * (num + 1)) + base;
};
