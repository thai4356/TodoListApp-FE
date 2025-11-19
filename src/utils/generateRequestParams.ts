import { cleanObject } from '.';

/**
 * @param objectReq
 * @returns string
 */

const generateRequestParams = (objectReq: { [key: string]: unknown }): string => {
  return Object.keys(cleanObject(objectReq)).reduce(
    (prevValue, currentValue, currentIndex) =>
      objectReq[currentValue] !== undefined && objectReq[currentValue] !== null
        ? (prevValue += `${currentIndex <= 0 ? '?' : '&'}${currentValue}=${window.encodeURIComponent(
            objectReq[currentValue] as string,
          )}`)
        : prevValue,
    '',
  );
};

export default generateRequestParams;
