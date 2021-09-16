import React, { memo } from 'react';
import Link from 'next/link';

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

type MenuButton = {
  readonly name: string;
  readonly href: string;
  readonly current: boolean;
};

export const MenuButton = memo<MenuButton>(({ name, href, current }) => {
  return (
    <Link href={href}>
      <a
        key={name}
        className={classNames(
          current ? 'bg-chosen text-white' : 'text-gray-300 hover:bg-hover hover:text-white',
          'block px-3 py-2 rounded-md text-base font-medium',
        )}
        aria-current={current ? 'page' : undefined}
      >
        {name}
      </a>
    </Link>
  );
});
