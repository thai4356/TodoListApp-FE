const formatNumber = (number: number, locale?: string, option?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(locale || 'vi-VN', {
    ...option,
    currency: option?.currency || 'VND',
  }).format(
    Number(
      option?.currency?.trim() === 'VND' || !option || (option && !option.currency)
        ? number.toFixed(0)
        : number.toFixed(2),
    ),
  );
};

export default formatNumber;
