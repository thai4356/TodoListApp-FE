function sumObjectNumber(obj: { [key: string]: unknown }) {
  let sum = 0;
  for (const el in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, el) && el !== 'value') {
      sum += Number(obj[el]);
    }
  }
  return sum;
}

export default sumObjectNumber;
