const generateRangeOfNumericArray = (start: number, end: number): number[] => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
};

export default generateRangeOfNumericArray;
