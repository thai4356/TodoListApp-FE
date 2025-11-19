// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePosition = (obj: any) => {
  let currenttop = -80; // => chiều cao của header
  if (obj.offsetParent) {
    do {
      currenttop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return currenttop;
  }
  return 0;
};
