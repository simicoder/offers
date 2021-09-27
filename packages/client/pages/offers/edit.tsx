import { Layout } from '../../components/organisms/Layout/Layout';
import { OfferForm } from '../../components/organisms/OfferForm/OfferForm';
import { useEffect, useState } from 'react';
import { fetcher } from '../../lib/utils/fetcher';
import { useRouter } from 'next/router';
import type { OfferType } from '@offers/types';
import { BASIC_API_URL } from '../../lib/utils/consts';
import { useMainContext } from '../../context/MainContext';

const EditOffer = () => {
  const [offer, setOffer] = useState({} as OfferType);
  const router = useRouter();

  const { setLoading } = useMainContext();

  useEffect(() => {
    async function getUserOffer() {
      setLoading(true);
      try {
        const { data }: { data: OfferType } = await fetcher(
          `${BASIC_API_URL}/offers/myoffers/${router.asPath.slice(16)}`,
          'GET',
        );
        if (!data || !router.asPath.slice(16).length) {
          router.push('/');
        }
        setOffer(data);
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    getUserOffer();
  }, []);

  return (
    <Layout title="Updated an offer" headerTitle="Update an offer">
      <OfferForm type="edit" offer={offer} />
    </Layout>
  );
};

export default EditOffer;
