import { useOffersContext } from '../../../context/OffersContext';
import { OfferTile } from '../../molecules/OfferTile/OfferTile';

export const SearchedOffers = () => {
  const { allOffers } = useOffersContext();

  return (
    <div className="min-h-full mx-auto grid items-center justify-center">
      {allOffers.length
        ? allOffers.map((offer) => (
            <OfferTile
              title={offer.title}
              city={offer.city}
              company_name={offer.company_name}
              salary={offer.salary}
              key={offer.id}
              id={offer.id}
            />
          ))
        : null}
    </div>
  );
};
