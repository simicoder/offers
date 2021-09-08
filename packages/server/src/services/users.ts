import { PrismaClient } from '@prisma/client';
import { fetchSingleOffer } from './offers';
import type { UserRegisterData } from '@offers/types';
const prisma = new PrismaClient();

export const findUserByEmail = (email: string) => {
  return prisma.user.findFirst({ where: { email } });
};

export const createUser = ({ name, email, company, password }: UserRegisterData) => {
  return prisma.user.create({ data: { name, email, company, password } });
};

export const findUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const changeUserData = (
  userId: number,
  { name, company, email, password }: UserRegisterData,
) => {
  return prisma.user.update({
    data: { name, company, email, password },
    where: { id: userId },
  });
};
