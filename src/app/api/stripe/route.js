import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prismaDb from 'src/lib/prismadb';
import { stripe } from 'src/lib/stripe';
import { absoluteUrl } from 'src/lib/utils';
const settingUrl = absoluteUrl('/settings');

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!user || !userId) {
      return NextResponse('UNAUTHORIZED', {
        status: 401,
      });
    }

    const userSubscription = await prismaDb.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingUrl,
      cancel_url: settingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Lucifer Pro',
              description: 'Unlimited access to Lucifer',
            },
            unit_amount: 50000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    return new NextResponse('INTERNAL_SERVER_ERROR' + error, {
      status: 500,
    });
  }
}
