import '../styles/globals.css';
import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import { MainProvider } from '../context/MainContext';
import { OffersProvider } from '../context/OffersContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const meta = {
  title: 'Offers',
  description: 'Offers is a platform for getting know your clients or freelancers',
};

export const titleTemplate = `%s | ${meta.title}`;

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <>
      <DefaultSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          type: 'website',
          title: meta.title,
          locale: 'en_EN',
          url: `https://${process.env.NEXT_PUBLIC_URL!}${asPath}`,
          description: meta.description,
          images: [
            {
              url: `https://${process.env.NEXT_PUBLIC_URL!}/logo_lg.png`,
              width: 1000,
              height: 750,
            },
          ],
          site_name: meta.title,
        }}
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="icon" sizes="16x16 32x32 64x64" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="196x196" href="/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="160x160" href="/favicon-160.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />

        <link rel="apple-touch-icon" href="/favicon-57.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon-114.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon-72.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon-144.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon-60.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon-120.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon-76.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon-152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <MainProvider>
        <OffersProvider>
          <NextNprogress color="#2067ff" startPosition={0.3} stopDelayMs={200} height={3} />

          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />

          <Component {...pageProps} />
        </OffersProvider>
      </MainProvider>
    </>
  );
}

export default MyApp;
