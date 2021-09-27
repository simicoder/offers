import { useOffersContext } from '../../../context/OffersContext';
import { useMainContext } from '../../../context/MainContext';
import { OfferTile } from '../../molecules/OfferTile/OfferTile';
import type { OfferType } from '@offers/types';
import { fetcher } from '../../../lib/utils/fetcher';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BASIC_API_URL } from '../../../lib/utils/consts';
import { Button } from '../../atoms/Button/Button';

export const Offers = () => {
  const { resultsPage, allOffers, setAllOffers, setResultsPage, setLastOffersApiCallAddress } =
    useOffersContext();
  const { setLoading } = useMainContext();

  useEffect(() => {
    setResultsPage(1);
    setAllOffers([]);
    handleLoadOffers(1);
  }, []);

  const handleLoadOffers = async (pageNum?: number) => {
    setLoading(true);

    const page = pageNum != 0 ? pageNum : resultsPage;

    try {
      const apiCallAddress = `${BASIC_API_URL}/offers?page=${page}`;

      const { data }: { data: OfferType[] } = await fetcher(apiCallAddress, 'GET');
      setResultsPage(resultsPage + 1);
      setAllOffers((prevState: OfferType[]) => [...prevState, ...data]);
      setLastOffersApiCallAddress(apiCallAddress);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center">
      {allOffers.length ? (
        allOffers.map((offer) => (
          <OfferTile
            title={offer.title}
            city={offer.city}
            company_name={offer.company_name}
            salary={offer.salary}
            key={offer.id}
            id={offer.id}
          />
        ))
      ) : (
        <div>no offers</div>
      )}
      {allOffers.length < 50 * resultsPage && allOffers.length ? null : allOffers.length ? (
        <Button
          onClick={() => {
            handleLoadOffers(0);
          }}
        >
          Load More
        </Button>
      ) : null}
    </div>
  );
};
