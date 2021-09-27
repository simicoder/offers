import { SearchInput } from '../../atoms/SearchInput/SearchInput';
import { prepareQueryToSearch } from '../../../lib/utils/functions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useOffersContext } from '../../../context/OffersContext';
import { fetcher } from '../../../lib/utils/fetcher';
import { useMainContext } from '../../../context/MainContext';
import type { OfferType } from '@offers/types';
import { toast } from 'react-toastify';
import { SearchedOffers } from '../../molecules/SearchedOffers/SearchedOffers';
import { BASIC_API_URL } from '../../../lib/utils/consts';
import { LoadMore } from '../../atoms/LoadMore/LoadMore';

export const SearchPage = () => {
  const router = useRouter();

  const { allOffers, setAllOffers, resultsPage, setResultsPage, setLastOffersApiCallAddress } =
    useOffersContext();

  const { setLoading } = useMainContext();

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    setAllOffers([]);
    searchOffers(router.asPath.slice(8));

    setValue(
      'search',
      decodeURIComponent((router.query.q as string) || (router.query.location as string) || ''),
    );
  }, [router.query]);

  const searchOffers = async (path = '') => {
    setLoading(true);
    try {
      const apiCallAddress = `${BASIC_API_URL}/offers/${path}`;
      const { data }: { data: OfferType[] } = await fetcher(apiCallAddress, 'GET');
      setAllOffers(data);
      setResultsPage(1);
      setLastOffersApiCallAddress(apiCallAddress);
    } catch (error) {
      toast((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = ({ search: query }: { search: string }) => {
    if (query && query.trim().length) {
      reset();
      router.replace({
        pathname: '/offers/search',
        query: { q: prepareQueryToSearch(query) },
      });
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <form
        autoComplete="false"
        className="h-12 flex mx-auto mb-3"
        onSubmit={handleSubmit(onSearch)}
      >
        <SearchInput label="search" type="search" register={register} required />
      </form>
      {allOffers.length ? (
        <>
          <SearchedOffers />
          {allOffers.length < 50 * resultsPage && allOffers.length ? null : allOffers.length ? (
            <LoadMore />
          ) : null}
        </>
      ) : (
        <div className="flex justify-center m-2">no offers</div>
      )}
    </div>
  );
};
