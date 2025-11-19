import { SVGProps } from 'react';

export const DeleteIcon = ({ fill = 'none', width = '16', height = '16', className }: SVGProps<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 30 34"
      strokeWidth="2"
      stroke="currentColor"
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M2 8.66667H28M11.75 15.3333V25.3333M18.25 15.3333V25.3333M3.625 8.66667L5.25 28.6667C5.25 29.5507 5.59241 30.3986 6.2019 31.0237C6.8114 31.6488 7.63805 32 8.5 32H21.5C22.362 32 23.1886 31.6488 23.7981 31.0237C24.4076 30.3986 24.75 29.5507 24.75 28.6667L26.375 8.66667M10.125 8.66667V3.66667C10.125 3.22464 10.2962 2.80072 10.601 2.48816C10.9057 2.17559 11.319 2 11.75 2H18.25C18.681 2 19.0943 2.17559 19.399 2.48816C19.7038 2.80072 19.875 3.22464 19.875 3.66667V8.66667"
        stroke="#BD0B24"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
