import { Path, UseFormRegister } from 'react-hook-form';

interface IFormValues {
  email: string;
  password: number;
  company?: string;
  name?: string;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  type?: string;
};

export const Input = ({
  label,
  register,
  required,
  type,
  ...props
}: InputProps & JSX.IntrinsicElements['input']) => (
  <>
    <label>{label}</label>
    <input
      type={type}
      className={`block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner ${
        props.className ?? ''
      }`}
      {...props}
      {...register(label, { required })}
    />
  </>
);
