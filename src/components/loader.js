import React from 'react';
import { cn } from 'src/lib/utils';
const Loader = ({ size = 'large' }) => {
  return (
    <span
      className={cn(
        'animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900',
        size === 'small'
          ? 'border-b-4 border-gray-900 h-16 w-16'
          : size === 'large'
          ? 'border-b-2 border-gray-900 h-32 w-32'
          : size === 'medium'
          ? 'border-b-2 border-gray-900 h-24 w-24'
          : ''
      )}
    >
      <span className="sr-only">Loading...</span>
    </span>
  );
};

export default Loader;
