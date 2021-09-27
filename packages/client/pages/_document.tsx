import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta name="msapplication-TileColor" content="#168eff" />
          <meta name="theme-color" content="#1f1f1f" />
          <meta name="apple-mobile-web-app-title" content="Offers" />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
          `,
            }}
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;600;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,600;1,700&display=swap"
          />

          <meta property="og:title" content="Offers" />
          <meta property="og:description" content="Find job here" />
          <meta property="og:image" content="https://i.ibb.co/" />
          <meta property="og:site_name" content="Offers" />
          <meta property="og:image:alt" content="Offers start page preview" />
          <meta property="og:image:width" content="500" />
          <meta property="og:image:height" content="500" />
          <meta property="og:url" content="https://offers.vercel.app" />

          <meta name="twitter:site" content="@Offers" />
          <meta name="twitter:title" content="Offers" />
          <meta name="twitter:description" content="Find job here" />

          <meta name="twitter:image:src" content="https://i.ibb.co/" />

          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
