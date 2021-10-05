import { useForm } from 'react-hook-form';
import type { UserRegisterData } from '@offers/types';
import { Input } from '../../atoms/Input/Input';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMainContext } from '../../../context/MainContext';
import { Button } from '../../atoms/Button/Button';
import { useEffect } from 'react';
import { fetcher } from '../../../lib/utils/fetcher';
import { toast } from 'react-toastify';
import { BASIC_API_URL } from '../../../lib/utils/consts';

export const RegisterForm = () => {
  const { handleSubmit, register, reset } = useForm({
    reValidateMode: 'onBlur',
  });

  const { isLogin, setLoading, setIsLogin } = useMainContext();

  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  const handleFormSubmit = async (data: UserRegisterData) => {
    reset();

    const { name, email, company, password } = data;

    setLoading(true);
    try {
      await fetcher(`${BASIC_API_URL}/users/register`, 'POST', {
        name,
        email,
        company,
        password,
      });
      toast('Thanks to register. Log in!');
    } catch (error) {
      toast((error as Error).message);
    } finally {
      setIsLogin(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen place-items-center">
      <form
        className="w-11/12 flex flex-col items-center p-12 sm:w-8/12 md:w-1/2 lg:w-5/12"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input label="name" register={register} required />
        <Input label="email" register={register} required />
        <Input label="company" register={register} required />

        <Input type="password" label="password" register={register} required />

        <Button type="submit">Create Account</Button>
      </form>
      <section>
        <span> Already have an account? </span>

        <Link href="/login">
          <a>Sign In!</a>
        </Link>
      </section>
    </div>
  );
};
