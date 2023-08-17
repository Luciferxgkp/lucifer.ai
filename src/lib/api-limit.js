import { auth } from '@clerk/nextjs';

import prismaDb from './prismadb';

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

export const getApiLimit = async () => {
  const { userId } = auth();
  if (!userId) return false;
  const userApiLimit = await prismaDb.UserApiLimit.findUnique({
    where: {
      userId,
    },
  });
  if (!userApiLimit || userApiLimit.count < process.env.MAX_FREE_COUNT)
    return true;
  return false;
};
