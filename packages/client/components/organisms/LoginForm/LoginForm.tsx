import { useForm } from 'react-hook-form';
import type { UserLoginData } from '@offers/types';
import { Input } from '../../atoms/Input/Input';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMainContext } from '../../../context/MainContext';
import { Button } from '../../atoms/Button/Button';
import { useEffect } from 'react';
import { BASIC_API_URL } from '../../../lib/utils/consts';
import { fetcher } from '../../../lib/utils/fetcher';
import { toast } from 'react-toastify';
import { inputValidation } from '../../../lib/utils/consts';

export const LoginForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const { isLogin, setLoading, setIsLogin } = useMainContext();

  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  useEffect(() => {
    toast.error(errors[Object.keys(errors)[0]]?.message);
  }, [errors.email]);

  const handleFormSubmit = async (data: UserLoginData) => {
    reset();

    setLoading(true);

    const { email, password } = data;

    try {
      await fetcher(`${BASIC_API_URL}/users/login`, 'POST', {
        email,
        password,
      });

      setIsLogin(true);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen place-items-center">
      <form
        className="flex flex-col items-center justify-center p-12 w-screen sm:w-11/12 md:w-3/5 lg:w-7/12"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input label="email" register={register} inputValidation={inputValidation.email} required />

        <Input
          type="password"
          label="password"
          inputValidation={inputValidation.password}
          register={register}
          required
        />

        <Button type="submit">Login</Button>
      </form>
      <section>
        <span> Don't have an account yet? </span>

        <Link href="/register">
          <a>Sign up!</a>
        </Link>
      </section>
    </div>
  );
};
