import { Path, UseFormRegister } from 'react-hook-form';

interface IFormValues {
  email: string;
  password: number;
  name: string;
  company: string;
  oldPassword: string;
  newPassword: string;
  title: string;
  city: string;
  salary: string;
  company_url: string;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required?: boolean;
  type?: string;
  inputValidation?: {};
};

export const Input = ({
  label,
  register,
  required,
  type,
  inputValidation,
  ...props
}: InputProps & JSX.IntrinsicElements['input']) => (
  <>
    <label>{label}</label>
    <input
      type={type}
      autoComplete="off"
      className={`block w-full md:w-96 p-3 mt-2 text-gray-200 bg-main appearance-none focus:outline-none focus:bg-main focus:shadow-inner ${
        props.className ?? ''
      }`}
      {...props}
      {...register(label, { required, ...inputValidation })}
    />
  </>
);
