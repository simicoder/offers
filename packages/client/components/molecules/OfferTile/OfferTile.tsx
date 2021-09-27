import { memo } from 'react';
import type { OfferType } from '@offers/types';
import Link from 'next/link';
import { addCommasToNumber } from '../../../lib/utils/functions';
import {
  BriefcaseIcon,
  OfficeBuildingIcon,
  LocationMarkerIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/outline';

type OfferTileProps = Pick<OfferType, 'id' | 'title' | 'company_name' | 'city' | 'salary'>;

export const OfferTile = memo<OfferTileProps>(({ id, title, company_name, city, salary }) => {
  return (
    <Link href={`/offers/${id}`}>
      <a>
        <article className="flex bg-main text-white my-2 p-2 w-[300px] md:w-full min-h-36 mx-auto rounded-xl shadow-lg overflow-hidden hover:bg-hover">
          <div className="flex flex-row items-center md:flex">
            <div className="flex md:flex-shrink-0">
              <BriefcaseIcon className="block h-20 w-20 text-white" aria-hidden="true" />
            </div>
            <div className="p-8 md:w-[650px] flex flex-col md:flex-row justify-center items-center">
              <h4 className="uppercase flex mb-2 md:mb-0 md:mr-2 tracking-wide text-sm text-indigo-500 font-semibold">
                {title.length > 120 ? title.slice(0, 117) + '...' : title}
              </h4>
              <div className="flex flex-col md:flex-row">
                <span className="flex text-white items-center md:mx-3">
                  <OfficeBuildingIcon className="block h-6 w-6 mr-1" aria-hidden="true" />
                  {company_name.length > 39 ? company_name.slice(0, 36) + '...' : company_name}
                </span>

                <span className="mt-2 md:mt-0 md:mx-3 text-gray-500 flex items-center">
                  <LocationMarkerIcon className="block h-6 w-6 mr-1" aria-hidden="true" />
                  {city.length > 50 ? city.slice(0, 47) + '...' : city}
                </span>

                <span className="mt-2 md:mt-0 md:mx-3 text-white flex items-center">
                  <CurrencyDollarIcon className="block h-6 w-6 mr-1" aria-hidden="true" />$
                  {addCommasToNumber(salary)}
                </span>
              </div>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
});

OfferTile.displayName = 'OfferTile';
