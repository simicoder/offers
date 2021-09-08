import {
  fetchMaxFiftyOffers,
  fetchSearchedOffers,
  fetchSingleOffer,
  addOffer,
  removeOffer,
  changeOffer,
  fetchCreatedOfferByUser,
  fetchOffersCreatedByUser,
} from '../services/offers';
import { validateOffer } from '../validation';
import type { Request, Response } from 'express';
import slug from 'slug';

export const getFiftyOffers = async (req: Request, res: Response) => {
  res.status(200).json(await fetchMaxFiftyOffers());
};

export const getSearchedOffers = async (req: Request, res: Response) => {
  res.status(200).json(await fetchSearchedOffers(req.query as any));
};

export const getSingleOffer = async (req: Request, res: Response) => {
  res.status(200).json(await fetchSingleOffer(req.params.id));
};

export const createOffer = async (req: Request, res: Response) => {
  const { error } = validateOffer(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  res.status(200).json(
    await addOffer(req.user!.id, {
      ...req.body,
      company_name: req.user!.company,
      id: slug(`${req.user!.company} ${req.body.title} ${req.body.city}`),
    }),
  );
};

export const deleteOffer = async (req: Request, res: Response) => {
  const offer = await fetchSingleOffer(req.params.id);

  if (offer?.userId === req.user!.id) {
    return res.status(200).json(await removeOffer(req.params.id));
  }

  res.status(400);
};

export const editOffer = async (req: Request, res: Response) => {
  const { error } = validateOffer(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const offer = await fetchSingleOffer(req.params.id);

  if (offer?.userId === req.user!.id) {
    return res.status(200).json(
      await changeOffer(req.params.id, {
        ...req.body,
        id: slug(`${req.user!.company} ${req.body.title} ${req.body.city}`),
      }),
    );
  }

  res.status(400);
};

export const getUserOffer = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await fetchCreatedOfferByUser(req.user!.id, req.params.id));
  } catch (e) {
    res.status(400).json({ message: 'Invalid parameters.' });
  }
};

export const getUserOffers = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await fetchOffersCreatedByUser(req.user!.id));
  } catch (e) {
    res.status(400).json({ message: 'Invalid parameters.' });
  }
};
