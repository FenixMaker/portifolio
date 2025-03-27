import * as React from 'react';
import { LucideProps } from 'lucide-react';

export const TikTokIcon: React.FC<LucideProps> = ({
  color = 'currentColor',
  size = 24,
  strokeWidth = 2,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V8c.9 0 1.8-.2 2.6-.5" />
      <path d="M13 7.5v2a9 9 0 0 0 5.5-2" />
      <path d="M18.5 2.5a4 4 0 0 1 0 5.5" />
    </svg>
  );
};

export default TikTokIcon;
