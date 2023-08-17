import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// import { Configuration, OpenAIApi } from 'openai';

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATEAI_API_TOKEN,
});

export const POST = async (req) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, count, size } = body;

    if (!userId) {
      return new NextResponse('UNAUTHORIZED', { status: 401 });
    }
    // if (!configuration.apiKey) {
    //   return new NextResponse('OPENAI_API_KEY_NOT_FOUND', { status: 500 });
    // }

    if (!replicate.auth) {
      return new NextResponse('REPLICATE_API_KEY_NOT_FOUND', { status: 500 });
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

    // const response = await openai.createImage({
    //   prompt: prompt,
    //   n: parseInt(count),
    //   size: size,
    // });
    const height = size.split('x')[1];
    const width = size.split('x')[0];
    const response = await replicate.run(
      'ai-forever/kandinsky-2.2:ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463',
      {
        input: {
          prompt: prompt,
          height: parseInt(height),
          width: parseInt(width),
          num_outputs: parseInt(count),
        },
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse('IMAGE_INTERNAL_ERROR ' + error.message, {
      status: 500,
    });
  }
};
