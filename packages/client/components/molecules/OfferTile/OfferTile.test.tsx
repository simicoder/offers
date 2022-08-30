import { render, screen } from '@testing-library/react';
import React from 'react';
import { OfferTile } from './OfferTile';
import { addCommasToNumber } from '../../../lib/utils/functions';

it('display correct information about offer', () => {
  const fakeOffer = {
    id: '1',
    title: 'title',
    city: 'city',
    company_name: 'company',
    salary: 1000,
  };

  render(
    <OfferTile
      title={fakeOffer.title}
      city={fakeOffer.city}
      company_name={fakeOffer.company_name}
      salary={fakeOffer.salary}
      key={fakeOffer.id}
      id={fakeOffer.id}
    />,
  );
  expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  expect(screen.getByText(fakeOffer.city)).toBeInTheDocument();
  expect(screen.getByText(fakeOffer.company_name)).toBeInTheDocument();
});
