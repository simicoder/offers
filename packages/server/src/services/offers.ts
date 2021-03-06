import { PrismaClient } from '@prisma/client';
import type { OfferType, Query } from '@offers/types';

const prisma = new PrismaClient();

export const fetchOffers = async (query: Query) => {
  const offers = await prisma.offer.findMany({
    skip: (query.page && (parseInt(query.page) - 1) * 50) || 0,
    take: 50,
  });

  if (offers) {
    return [...offers];
  }
};

export const fetchSearchedOffers = async (query: Query) => {
  const page = Number(query.page) || 0;

  const offers = [
    ...(await prisma.offer.findMany({
      where: {
        OR: [
          {
            title: {
              contains: decodeURIComponent(query.q),
              mode: 'insensitive',
            },
          },
          {
            company_name: {
              contains: decodeURIComponent(query.q),
              mode: 'insensitive',
            },
          },
          {
            city: {
              contains: decodeURIComponent(query.location) || decodeURIComponent(query.q),
              mode: 'insensitive',
            },
          },
          {
            body: {
              contains: decodeURIComponent(query.q),
              mode: 'insensitive',
            },
          },
          {
            skills: {
              contains: decodeURIComponent(query.skill),
              mode: 'insensitive',
            },
          },
        ],
      },
      skip: page * 50,
      take: 50,
    })),
  ];

  return [...offers];
};

export const fetchSingleOffer = async (offerId: string) => {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
  });

  if (offer) {
    return {
      ...offer,
      skills: offer.skills?.split(',').map((skill: string) => ({ name: skill.trim() })),
    };
  }
};

export const addOffer = (userId: number, data: OfferType & { skills: string }) => {
  return prisma.offer.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const changeOffer = (offerId: string, data: OfferType & { skills: string }) => {
  return prisma.offer.update({
    where: { id: offerId },
    data: { ...data },
  });
};

export const removeOffer = async (offerId: string) => {
  await prisma.userOfferLibrary.deleteMany({ where: { offerId } });

  return await prisma.offer.delete({
    where: { id: offerId },
  });
};

export const fetchOffersCreatedByUser = (userId: number) => {
  return prisma.offer.findMany({
    where: { userId },
  });
};

export const fetchCreatedOfferByUser = (userId: number, offerId: string) => {
  return prisma.offer.findFirst({
    where: { AND: [{ id: offerId }, { userId }] },
  });
};
