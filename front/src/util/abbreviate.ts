const abbreviateNumber = (text: string) => {
  const madeNumber = Number(text);
  let returnString;
  if (madeNumber / 1000000000 >= 1) {
    returnString = (madeNumber / 1000000000).toFixed(1) + 'b';
  } else if (madeNumber / 1000000 >= 1) {
    returnString = (madeNumber / 1000000).toFixed(1) + 'm';
  } else if (madeNumber / 1000 >= 1) {
    returnString = (madeNumber / 1000).toFixed(1) + 'k';
  } else {
    returnString = madeNumber;
  }

  return returnString;
};

export default abbreviateNumber;
