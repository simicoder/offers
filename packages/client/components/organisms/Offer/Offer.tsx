import { Button } from '../../atoms/Button/Button';
import type { OfferType } from '@offers/types';
import { memo, useCallback, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  LocationMarkerIcon,
  ClockIcon,
  PencilIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { BASIC_API_URL } from '../../../lib/utils/consts';
import { fetcher } from '../../../lib/utils/fetcher';

type SingleOfferProps = { readonly offer: OfferType };

export const Offer = memo<SingleOfferProps>(({ offer }) => {
  const [isCreatedByUser, setIsCreatedByUser] = useState(false);

  const router = useRouter();

  const handleEditOffer = useCallback(() => {
    router.push(`/offers/edit?id=${offer.id}`);
  }, [offer.id]);

  useEffect(() => {
    checkIsCreatedByUser();
  }, []);

  const checkIsCreatedByUser = async () => {
    try {
      const { data } = await fetcher(`${BASIC_API_URL}/offers/myoffers/${offer.id}`, 'GET');
      setIsCreatedByUser(!!data);
    } catch {
      setIsCreatedByUser(false);
    }
  };

  return (
    <section className="flex flex-col mx-auto md:w-1/2">
      <article className="mx-6 my-2 flex items-center justify-between">
        <BriefcaseIcon className="h-16 w-16" />
        <div className="flex flex-col m-1">
          <span className="text-xs text-gray-500">title</span>
          <span>{offer.title}</span>
        </div>

        <div className="flex flex-col m-1">
          <span className="text-xs text-gray-500">company</span>
          <span>{offer.company_name}</span>
        </div>

        {isCreatedByUser && (
          <button onClick={handleEditOffer}>
            {' '}
            <PencilIcon className="h-5 w-5 mr-1" />
          </button>
        )}
      </article>

      <div className="flex flex-col sm:flex-row justify-center">
        <div className="flex flex-row justify-center">
          <span className="m-2 min-width-full flex flex-row items-center justify-center bg-main p-2 rounded-md">
            <ClockIcon className="h-5 w-5 mr-2" />
            <time>{dayjs(offer.published_at).format('dddd DD/MM/YY h:m A')}</time>
          </span>
        </div>

        <div className="flex flex-row justify-center">
          <span className="m-2 flex flex-row items-center justify-center bg-main p-2 rounded-md">
            <LocationMarkerIcon className="h-5 w-5 mr-1" />
            {offer.city}
          </span>
          <span className="m-2 flex flex-row items-center justify-center bg-main p-2 rounded-md">
            <CurrencyDollarIcon className="h-5 w-5 mr-1" />
            {offer.salary} $
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center p-2 rounded-md justify-center">
        <span className="flex text-xs text-gray-500">skills</span>

        <div className="flex flex-row justify-center items-center flex-wrap">
          {offer.skills.map((skill) => (
            <div
              key={skill.name}
              className="m-2 flex flex-row items-center justify-center bg-main p-2 rounded-full"
            >
              {' '}
              {skill.name}{' '}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-start mt-5 m-2">
        <p
          className="flex align-baseline justify-center"
          dangerouslySetInnerHTML={{
            __html: offer.body,
          }}
        ></p>
      </div>

      {offer.company_url ? (
        <a href={offer.company_url} rel="noopener">
          <Button>Go to company site</Button>
        </a>
      ) : null}
    </section>
  );
});
