import { auth } from '@clerk/nextjs';
import prismaDb from 'src/lib/prismadb';

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }
  const userSubscription = await prismaDb.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      striptSubscriptionId: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });
  if (!userSubscription) {
    return false;
  }
  const currentPeriodEnd = userSubscription.stripeCurrentPeriodEnd;
  const now = new Date();
  if (now.getTime() > currentPeriodEnd.getTime()) {
    return false;
  }
  return true;
};
