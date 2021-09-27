import { useEffect } from 'react';
import { Input } from '../../atoms/Input/Input';
import { inputValidation } from '../../../lib/utils/consts';
import { useForm } from 'react-hook-form';
import type { UserRegisterData } from '@offers/types';
import { useMainContext } from '../../../context/MainContext';
import { fetcher } from '../../../lib/utils/fetcher';
import { toast } from 'react-toastify';
import { Button } from '../../atoms/Button/Button';
import { BASIC_API_URL } from '../../../lib/utils/consts';
import { useRouter } from 'next/router';

export const AccountPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const router = useRouter();

  const { user, setUser, setLoading, isLogin } = useMainContext();

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin]);

  useEffect(() => {
    setValue('name', user.name);
    setValue('company', user.company);
    setValue('email', user.email);
  }, [user]);

  useEffect(() => {
    toast.error(errors[Object.keys(errors)[0]]?.message);
  }, [errors.email]);

  const handleChangeUserInfo = async (
    data: UserRegisterData & { oldPassword: string; newPassword: string },
  ) => {
    setLoading(true);
    try {
      await fetcher(`${BASIC_API_URL}/users`, 'POST', data);
      setUser(data);
      toast.info('Succesfully updated!');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <article className="flex flex-col justify-center items-center my-3">
        <span className="text-lg bg-main p-2 rounded-md">{user.name}</span>
        <span className="text-md text-gray-500">{user.company}</span>
      </article>

      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit(handleChangeUserInfo)}
      >
        <Input label="name" register={register} inputValidation={inputValidation.other} required />
        <Input
          label="company"
          register={register}
          inputValidation={inputValidation.other}
          required
        />
        <Input label="email" register={register} inputValidation={inputValidation.email} required />
        <Input
          label="oldPassword"
          placeholder="Actual password"
          inputValidation={inputValidation.password}
          register={register}
          required
        />
        <Input
          label="newPassword"
          placeholder="New password"
          inputValidation={inputValidation.password}
          register={register}
        />

        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
};
