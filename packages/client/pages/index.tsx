import type { NextPage } from 'next';
import { Offers } from '../components/organisms/Offers/Offers';
import { Layout } from '../components/organisms/Layout/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Offers />
    </Layout>
  );
};

export default Home;
