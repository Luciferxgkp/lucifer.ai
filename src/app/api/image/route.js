import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const POST = async (req) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, count, size } = body;

    if (!userId) {
      return new NextResponse('UNAUTHORIZED', { status: 401 });
    }
    if (!configuration.apiKey) {
      return new NextResponse('OPENAI_API_KEY_NOT_FOUND', { status: 500 });
    }
    if (!prompt) {
      return new NextResponse('PROMPT_NOT_FOUND', { status: 400 });
    }
    if (!count) {
      return new NextResponse('AMOUNT_NOT_FOUND', { status: 400 });
    }
    if (!size) {
      return new NextResponse('RESOLUTION_NOT_FOUND', { status: 400 });
    }

    const response = await openai.createImage({
      prompt: prompt,
      n: parseInt(count),
      size: size,
    });

    return NextResponse.json(response.data.data);
  } catch (error) {
    return new NextResponse('IMAGE_INTERNAL_ERROR ' + error.message, {
      status: 500,
    });
  }
};
