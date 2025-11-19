const getEnumLength = <T>(myEnum: T): number => {
  return Object.values(myEnum as { [s: string]: unknown }).filter((value) => typeof value === 'number').length;
};

export default getEnumLength;
