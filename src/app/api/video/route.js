import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { checkApiLimit, increaseApiLimit } from 'src/lib/api-limit';
import { checkSubscription } from 'src/lib/subscriptions';
const replicate = new Replicate({
  auth: process.env.REPLICATEAI_API_TOKEN,
});
export const POST = async (req) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse('UNAUTHORIZED', { status: 401 });
    }
    if (!replicate.auth) {
      return new NextResponse('REPLICATE_API_KEY_NOT_FOUND', { status: 500 });
    }
    if (!prompt) {
      return new NextResponse('PROMPT_NOT_FOUND', { status: 400 });
    }
    const isApiLimit = await checkApiLimit();
    const isSubscribed = await checkSubscription();
    if (!isApiLimit && !isSubscribed) {
      return new NextResponse('Free API limit exceeded', { status: 429 });
    }
    const response = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          prompt: prompt,
        },
      }
    );
    if (!isSubscribed) {
      await increaseApiLimit();
    }
    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse('AUDIO_INTERNAL_ERROR ' + error.message, {
      status: 500,
    });
  }
};
