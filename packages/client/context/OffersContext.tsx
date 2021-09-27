import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';
import type { OfferType } from '@offers/types';

const OffersContext = createContext<ContextType>({
  allOffers: [],
  setAllOffers: () => {},
  lastOffersApiCallAddress: '',
  setLastOffersApiCallAddress: () => {},
  resultsPage: 1,
  setResultsPage: () => {},
});

type ContextType = {
  allOffers: OfferType[];
  setAllOffers: any;
  lastOffersApiCallAddress: string;
  setLastOffersApiCallAddress: Dispatch<SetStateAction<string>>;
  resultsPage: number;
  setResultsPage: Dispatch<SetStateAction<number>>;
};

export const useOffersContext = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error('Error while reading context!');
  }

  return context;
};

export const OffersProvider = ({ children }: { children: React.ReactNode }) => {
  const [allOffers, setAllOffers] = useState([]);
  const [lastOffersApiCallAddress, setLastOffersApiCallAddress] = useState('');
  const [resultsPage, setResultsPage] = useState(1);

  return (
    <OffersContext.Provider
      value={{
        allOffers,
        setAllOffers,
        lastOffersApiCallAddress,
        setLastOffersApiCallAddress,
        resultsPage,
        setResultsPage,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};
