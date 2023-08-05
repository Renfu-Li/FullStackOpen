const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  if (array.length === 0) {
    return 0;
  } else {
    const sum = array.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return sum / array.length;
  }
};

module.exports = { reverse, average };
