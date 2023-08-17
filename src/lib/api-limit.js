import { auth } from '@clerk/nextjs';

import prismaDb from './prismadb';
import { MAX_FREE_COUNT } from 'src/constants';

export const increaseApiLimit = async () => {
  const { userId } = auth();
  const userApiLimit = await prismaDb.UserApiLimit.findUnique({
    where: {
      userId,
    },
  });
  if (!userId) return;

  if (userApiLimit) {
    await prismaDb.UserApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    await prismaDb.UserApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();
  if (!userId) return false;
  const userApiLimit = await prismaDb.UserApiLimit.findUnique({
    where: {
      userId,
    },
  });
  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) return true;
  return false;
};

export const getApiLimit = async () => {
  const { userId } = auth();
  if (!userId) return 0;
  const userApiLimit = await prismaDb.UserApiLimit.findUnique({
    where: {
      userId,
    },
  });
  if (!userApiLimit) return 0;
  return userApiLimit.count;
};
