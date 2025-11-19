const checkIsJson = (str: string) => {
  try {
    if (typeof str !== 'string') {
      return false;
    }

    JSON.parse(str);

    return true;
  } catch (e) {
    if (import.meta.env.DEV) {
      console.error(e);
    }

    return false;
  }
};

export default checkIsJson;
