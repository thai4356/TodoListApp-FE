import { SVGProps } from 'react';

export const ICStatus = ({ className }: SVGProps<SVGElement>) => {
  const fill = 'none';
  const width = '24';
  const height = '24';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill={fill}></path>
      <polyline points="9 11 12 14 20 6"></polyline>
      <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
    </svg>
  );
};
