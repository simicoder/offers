import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { MenuButton } from '../../atoms/MenuButton/MenuButton';
import { LogoButton } from '../../atoms/LogoButton/LogoButton';
import { useMainContext } from '../../../context/MainContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Search', href: '/offers/search' },
  { name: 'About', href: '/about' },
];

export const Navbar = () => {
  const { isLogin } = useMainContext();

  return (
    <Popover as="nav" className="w-full bg-main">
      {({ open }) => (
        <>
          <div className="w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>

              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <LogoButton />
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <MenuButton name={item.name} key={item.name} href={item.href} />
                    ))}
                    {isLogin ? <MenuButton name="Add Offer" href="/offers/new" /> : null}
                  </div>
                </div>
              </div>

              {isLogin ? <UserMenu /> : <MenuButton name="login" href="/login" />}
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="sm:hidden absolute z-10 w-screen bg-black">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <MenuButton name={item.name} key={item.name} href={item.href} />
                ))}
                {isLogin ? <MenuButton name="Add Offer" href="/offers/new" /> : null}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
