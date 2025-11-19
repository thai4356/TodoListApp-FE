import { convertColorFromHslToRgb, convertColorFromHwbToRgb } from '.';

const convertColorToRGB = (color: string): { r: number; g: number; b: number; alpha: number } | null => {
  // Default alpha value is 1
  const alpha = 1;

  if (color.startsWith('rgba(')) {
    const rgbaValues = color
      .substring(5, color.length - 1)
      .split(',')
      .map((value) => parseFloat(value.trim()));

    return {
      r: rgbaValues[0],
      g: rgbaValues[1],
      b: rgbaValues[2],
      alpha: rgbaValues[3],
    };
  }

  if (color.startsWith('#')) {
    // Hex to RGB
    color = color.substring(1);
    return {
      r: parseInt(color.substring(0, 2), 16),
      g: parseInt(color.substring(2, 4), 16),
      b: parseInt(color.substring(4, 6), 16),
      alpha,
    };
  }

  if (color.startsWith('rgb(')) {
    // RGB to RGB
    color = color.substring(4, color.length - 1);
    const components = color.split(',');
    return {
      r: parseInt(components[0]),
      g: parseInt(components[1]),
      b: parseInt(components[2]),
      alpha,
    };
  }

  if (color.startsWith('rgba(')) {
    // RGBA to RGB
    color = color.substring(5, color.length - 1);
    const components = color.split(',');
    return {
      r: parseInt(components[0]),
      g: parseInt(components[1]),
      b: parseInt(components[2]),
      alpha,
    };
  }

  if (color.startsWith('hsl(')) {
    // HSL to RGB
    color = color.substring(4, color.length - 1);
    const components = color.split(',');
    const h = parseInt(components[0]);
    const s = parseInt(components[1].replace('%', ''));
    const l = parseInt(components[2].replace('%', ''));
    return {
      ...convertColorFromHslToRgb(h, s, l),
      alpha,
    };
  }

  if (color.startsWith('hwb(')) {
    // HWB to RGB
    color = color.substring(4, color.length - 1);
    const components = color.split(',');
    const h = parseInt(components[0]);
    const w = parseInt(components[1].replace('%', ''));
    const b = parseInt(components[2].replace('%', ''));
    return {
      ...convertColorFromHwbToRgb(h, w, b),
      alpha,
    };
  }

  // Invalid color format
  return null;
};

export default convertColorToRGB;
