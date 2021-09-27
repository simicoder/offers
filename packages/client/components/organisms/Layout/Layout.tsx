import { memo } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { NextSeo } from 'next-seo';
import { AuthChecker } from '../AuthChecker/AuthChecker';

import { titleTemplate as defaultTitleTemplate } from '../../../pages/_app';

type LayoutProps = {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly titleTemplate?: string;
  readonly headerTitle?: string;
};

export const Layout = memo<LayoutProps>(
  ({ children, title, titleTemplate = defaultTitleTemplate }) => {
    return (
      <AuthChecker>
        <div className="min-h-screen flex flex-col text-center">
          <header>
            <Navbar />
          </header>
          <main className="flex-grow mt-1">{children}</main>
          <footer className="h-10">Website by simicoder</footer>

          <NextSeo
            title={title ? titleTemplate.replace('%s', title) : titleTemplate.slice(4)}
            openGraph={{
              title: title ? titleTemplate.replace('%s', title) : titleTemplate.slice(4),
            }}
          />
        </div>
      </AuthChecker>
    );
  },
);
