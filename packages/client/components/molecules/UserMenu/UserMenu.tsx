import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { fetcher } from '../../../lib/utils/fetcher';
import { BASIC_API_URL } from '../../../lib/utils/consts';
import { useMainContext } from '../../../context/MainContext';
import { toast } from 'react-toastify';

export const UserMenu = () => {
  const { setIsLogin, setUser } = useMainContext();

  const logout = async () => {
    try {
      await fetcher(`${BASIC_API_URL}/users/logout`, 'GET');
      setIsLogin(false);
      setUser({ name: '', email: '', company: '', password: '' });
    } catch (error) {
      toast((error as Error).message);
    }
  };

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="bg-gray-800 flex text-sm rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset">
            <span className="sr-only">Open user menu</span>
            <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-main ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Link href={'/account'}>
                <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-hover">
                  Your Profile
                </a>
              </Link>
            </Menu.Item>

            <Menu.Item>
              <button
                onClick={logout}
                className="block w-full px-4 py-2 text-sm text-gray-200 hover:bg-hover"
              >
                Sign out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
