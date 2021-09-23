import { Path, UseFormRegister } from 'react-hook-form';
import { SearchIcon } from '@heroicons/react/outline';

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
  <div className="bg-main w-full md:w-96 h-full items-center my-1 py-1 flex justify-between rounde-md rounded-md">
    <input
      type={type}
      autoComplete="off"
      className={`block bg-main rounded-md border-0 focus:outline-none focus:ring-0 focus:border-blue-500 flex-grow p-2`}
      placeholder={label}
      {...props}
      {...register(label, { required })}
    />
    <button type="submit">
      <SearchIcon
        className="h-10 w-10 p-2 text-gray-400 bg-main hover:text-blue-400 transition duration-100 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      />
    </button>
  </div>
);
