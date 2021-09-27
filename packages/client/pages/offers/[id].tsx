import { GetStaticProps, GetStaticPaths } from 'next';
import { Layout } from '../../components/organisms/Layout/Layout';
import { Offer } from '../../components/organisms/Offer/Offer';
import type { OfferType } from '@offers/types';
import { fetcher } from '../../lib/utils/fetcher';
import { BASIC_API_URL } from '../../lib/utils/consts';

const OfferPage = ({ offer }: { offer: OfferType }) => {
  return (
    <Layout>
      <Offer offer={offer} />
    </Layout>
  );
};

export default OfferPage;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { data }: { data: OfferType } = await fetcher(
      `${BASIC_API_URL}/offers/${context.params!.id}`,
      'GET',
    );

    if (!data) {
      return {
        notFound: true as const,
      };
    }

    return { props: { offer: data } };
  } catch {
    return {
      notFound: true as const,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data }: { data: OfferType[] } = await fetcher(`${BASIC_API_URL}/offers`, 'GET');
    return {
      paths: data.map((item) => ({
        params: { id: item.id },
      })),
      fallback: 'blocking' as const,
    };
  } catch (err) {
    throw err;
  }
};
