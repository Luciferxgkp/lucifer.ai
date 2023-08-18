import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prismaDb from 'src/lib/prismadb';
import { stripe } from 'src/lib/stripe';

export async function POST(request) {
  const body = await request.text();
  const sig = headers().get('Stripe-Signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new NextResponse('WEB_HOOK_ERROR' + err.message, {
      status: 400,
    });
  }

  const session = event.data.object;
  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    if (!session?.metadata?.userId) {
      return new NextResponse('USER_ID_NOT_FOUND', {
        status: 400,
      });
    }

    await prismaDb.UserSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeCustomerId: subscription.customer,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    await prismaDb.UserSubscription.update({
      where: {
        subscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return new NextResponse(null, {
    status: 200,
  });
}
