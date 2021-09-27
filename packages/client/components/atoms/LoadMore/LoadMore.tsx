import React, { memo } from 'react';
import { useOffersContext } from '../../../context/OffersContext';
import { useMainContext } from '../../../context/MainContext';
import { toast } from 'react-toastify';
import { fetcher } from '../../../lib/utils/fetcher';

import type { OfferType } from '@offers/types';

export const LoadMore = memo(() => {
  const { setAllOffers, resultsPage, setResultsPage, lastOffersApiCallAddress } =
    useOffersContext();

  const { setLoading } = useMainContext();

  const onClick = async () => {
    setLoading(true);

    try {
      const { data }: { data: OfferType[] } = await fetcher(
        `${lastOffersApiCallAddress}&page=${resultsPage + 1}`,
        'GET',
      );
      setResultsPage(resultsPage + 1);
      setAllOffers((prevState: OfferType[]) => [...prevState, ...data]);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(true);
    }
  };

  return (
    <button
      className="md:w-96 p-3 m-6 font-medium tracking-widest rounded-md text-white uppercase bg-main shadow-lg focus:outline-none hover:bg-hover hover:shadow-none"
      onClick={onClick}
    >
      Load More
    </button>
  );
});
