import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { inputValidation } from '../../../lib/utils/consts';
import { memo, useEffect } from 'react';
import type { OfferType } from '@offers/types';
import { useForm } from 'react-hook-form';
import { BASIC_API_URL } from '../../../lib/utils/consts';
import { fetcher } from '../../../lib/utils/fetcher';
import { toast } from 'react-toastify';
import { useMainContext } from '../../../context/MainContext';
import { useRouter } from 'next/router';

type OfferFormProps = {
  readonly offer?: OfferType;
  readonly type: 'add' | 'edit';
};

export const OfferForm = memo<OfferFormProps>(({ offer, type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const router = useRouter();

  const { setLoading, isLogin } = useMainContext();

  useEffect(() => {
    if (!isLogin) {
      console.log('not');
      router.push('/login');
    }
  }, [isLogin]);

  useEffect(() => {
    toast.error(errors[Object.keys(errors)[0]]?.message);
  }, [errors.title]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    reset(offer);
  }, [offer]);

  const handleFormSubmit = (data: OfferType) => {
    if (type === 'edit') {
      editOffer(offer!.id, { ...data, salary: Number(data.salary) });
    } else {
      createOffer({ ...data, salary: Number(data.salary) });
    }
  };

  const editOffer = async (id: string, data: OfferType) => {
    setLoading(true);
    try {
      await fetcher(`${BASIC_API_URL}/offers/${id}`, 'PUT', { ...data });
      toast.info('Offer has been changed!');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createOffer = async (offer: OfferType) => {
    setLoading(true);
    try {
      await fetcher(`${BASIC_API_URL}/offers/new`, 'POST', { ...offer });
      toast.info('Your offer has been added!');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col mx-3 justify-center items-center"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input label="title" register={register} inputValidation={inputValidation.other} required />
      <Input label="city" register={register} inputValidation={inputValidation.other} required />
      <Input label="salary" register={register} inputValidation={inputValidation.other} required />

      <textarea
        cols={30}
        rows={9}
        className="block w-full md:w-96 p-3 mt-2 text-gray-200 bg-main appearance-none focus:outline-none focus:bg-main focus:shadow-inner"
        placeholder="Description..."
        {...register('body', inputValidation.other)}
      ></textarea>

      <textarea
        cols={30}
        rows={4}
        className="block w-full md:w-96 p-3 mt-2 text-gray-200 bg-main appearance-none focus:outline-none focus:bg-main focus:shadow-inner"
        placeholder="Skills (separated by comma e.g. JavaScript, HTML etc.)"
        {...register('skills', inputValidation.other)}
      ></textarea>

      <Input label="company_url" register={register} placeholder="Company site (optional)" />

      <Button type="submit">{`${type === 'add' ? 'Create' : 'Update'}`}</Button>
    </form>
  );
});
