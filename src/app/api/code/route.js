import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import { checkApiLimit, increaseApiLimit } from 'src/lib/api-limit';
import { checkSubscription } from 'src/lib/subscriptions';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const instrutionMessage = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
};

export const POST = async (req) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse('UNAUTHORIZED', { status: 401 });
    }
    if (!configuration.apiKey) {
      return new NextResponse('OPENAI_API_KEY_NOT_FOUND', { status: 500 });
    }
    if (!messages) {
      return new NextResponse('PROMPT_NOT_FOUND', { status: 400 });
    }
    const isApiLimit = await checkApiLimit();
    const isSubscribed = await checkSubscription();
    if (!isApiLimit && !isSubscribed) {
      return new NextResponse('Free API limit exceeded', { status: 429 });
    }
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [instrutionMessage, ...messages],
    });

    if (!isSubscribed) {
      await increaseApiLimit();
    }
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    return new NextResponse('CODE_INTERNAL_ERROR ' + error.message, {
      status: 500,
    });
  }
};
