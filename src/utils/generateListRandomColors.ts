const generateListRandomColors = (count: number): string[] => {
  const randomColors: string[] = [];

  for (let i = 1; i <= count; i++) {
    const hexColor = Math.floor(Math.random() * 16777216)
      .toString(16)
      .padStart(6, '0');

    if (randomColors.includes(hexColor)) {
      randomColors.concat(generateListRandomColors(count - i));
    } else {
      randomColors.push(`#${hexColor}`);
    }
  }

  return randomColors;
};

export default generateListRandomColors;
