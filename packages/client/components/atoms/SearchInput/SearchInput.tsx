import { Path, UseFormRegister } from 'react-hook-form';
import { SearchIcon, XIcon } from '@heroicons/react/outline';

type InputProps = {
  label: Path<String>;
  register: UseFormRegister<String>;
  required: boolean;
  type?: string;
};

export const SearchInput = ({
  label,
  register,
  required,
  type,
  ...props
}: InputProps & JSX.IntrinsicElements['input']) => (
  <div className="flex justify-center items-center mt-5 mb-2 py-1 px-3 flex justify-between rounde-md rounded-md">
    <input
      type={type}
      className={`block rounded-md border-0 focus:outline-none focus:ring-0 focus:border-blue-500 flex-grow p-2 ${
        props.className ?? ''
      }`}
      placeholder={'label'}
      {...props}
      {...register(label, { required })}
    />
    <button type="submit">
      <SearchIcon
        className="h-6 w-6 text-gray-400 hover:text-blue-400 transition duration-100 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </SearchIcon>
    </button>
  </div>
);
