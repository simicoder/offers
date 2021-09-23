import React, { memo } from 'react';
import Link from 'next/link';

type MenuButton = {
  readonly name: string;
  readonly href: string;
};

export const MenuButton = memo<MenuButton>(({ name, href }) => {
  return (
    <Link href={href}>
      <a
        key={name}
        className="text-gray-300 hover:bg-hover hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        {name}
      </a>
    </Link>
  );
});
