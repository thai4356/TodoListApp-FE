const convertColorFromHwbToRgb = (h: number, w: number, b: number): { r: number; g: number; b: number } => {
  // HWB to RGB conversion
  h /= 360;
  w /= 100;
  b /= 100;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const q = 1 - b;

  switch (i % 6) {
    case 0:
      return { r: 255, g: f * 255, b: 0 };
    case 1:
      return { r: q * 255, g: 255, b: 0 };
    case 2:
      return { r: 0, g: 255, b: f * 255 };
    case 3:
      return { r: 0, g: q * 255, b: 255 };
    case 4:
      return { r: f * 255, g: 0, b: 255 };
    case 5:
      return { r: 255, g: 0, b: q * 255 };
    default:
      return { r: 0, g: 0, b: 0 };
  }
};
export default convertColorFromHwbToRgb;
