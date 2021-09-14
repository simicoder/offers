import React, { memo } from 'react';
import { GlobeIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export const LogoButton = memo(() => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link href={'/'}>
        <button
          type="button"
          className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <span className="sr-only">Home</span>
          <GlobeIcon className="h-7 w-7" aria-hidden="true" />
        </button>
      </Link>
    </div>
  );
});
